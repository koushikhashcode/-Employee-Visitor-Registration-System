import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Visitor, IVisitor, VisitorPurpose } from '../models/Visitor.js';

// In-Memory Seed & Data Store for graceful fallback when live MongoDB is not configured
interface MemoryVisitor {
  id: string;
  name: string;
  mobile: string;
  organization: string;
  personToMeet: string;
  purpose: VisitorPurpose;
  visitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Initial realistic seed data for the front desk reception register
const initialMemoryVisitors: MemoryVisitor[] = [
  {
    id: 'vis_01j7x8a901',
    name: 'Sarah Jenkins',
    mobile: '9876543210',
    organization: 'Acme Technologies Inc.',
    personToMeet: 'Alex Rivera (VP Engineering)',
    purpose: 'Meeting',
    visitedAt: new Date(Date.now() - 25 * 60 * 1000), // 25 mins ago
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    updatedAt: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: 'vis_01j7x8b902',
    name: 'David Chen',
    mobile: '9123456780',
    organization: 'Stanford University',
    personToMeet: 'Elena Rostova (HR Lead)',
    purpose: 'Interview',
    visitedAt: new Date(Date.now() - 75 * 60 * 1000), // 1h 15m ago
    createdAt: new Date(Date.now() - 75 * 60 * 1000),
    updatedAt: new Date(Date.now() - 75 * 60 * 1000),
  },
  {
    id: 'vis_01j7x8c903',
    name: 'Marcus Vance',
    mobile: '9845012345',
    organization: 'DHL Express Logistics',
    personToMeet: 'Reception Desk / Ops',
    purpose: 'Delivery',
    visitedAt: new Date(Date.now() - 140 * 60 * 1000), // 2h 20m ago
    createdAt: new Date(Date.now() - 140 * 60 * 1000),
    updatedAt: new Date(Date.now() - 140 * 60 * 1000),
  },
  {
    id: 'vis_01j7x8d904',
    name: 'Priya Sharma',
    mobile: '9988776655',
    organization: 'Apex Facility Management',
    personToMeet: 'Thomas Wright (Operations)',
    purpose: 'Maintenance',
    visitedAt: new Date(Date.now() - 210 * 60 * 1000), // 3.5h ago
    createdAt: new Date(Date.now() - 210 * 60 * 1000),
    updatedAt: new Date(Date.now() - 210 * 60 * 1000),
  },
  {
    id: 'vis_01j7x8e905',
    name: 'Robert Miller',
    mobile: '9765432109',
    organization: 'Kite Design Studio',
    personToMeet: 'Alex Rivera (VP Engineering)',
    purpose: 'Meeting',
    visitedAt: new Date(Date.now() - 320 * 60 * 1000), // 5+ hrs ago
    createdAt: new Date(Date.now() - 320 * 60 * 1000),
    updatedAt: new Date(Date.now() - 320 * 60 * 1000),
  },
  {
    id: 'vis_01j7x8f906',
    name: 'Emily Davis',
    mobile: '9456781230',
    organization: 'Freelance Consultant',
    personToMeet: 'Elena Rostova (HR Lead)',
    purpose: 'Interview',
    visitedAt: new Date(Date.now() - 26 * 60 * 60 * 1000), // Yesterday
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
  },
];

let inMemoryStore: MemoryVisitor[] = [...initialMemoryVisitors];

// Helper to determine if we should execute using live Mongoose model
const isMongoLive = (): boolean => {
  return mongoose.connection.readyState === 1;
};

/**
 * @route   GET /api/visitors
 * @desc    Get all visitors with newest first, supporting search by name or mobile
 * @access  Public
 */
export const getVisitors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchTerm = typeof req.query.search === 'string' ? req.query.search.trim() : '';

    if (isMongoLive()) {
      let filter = {};
      if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        filter = {
          $or: [{ name: regex }, { mobile: regex }, { organization: regex }, { personToMeet: regex }],
        };
      }

      const visitors = await Visitor.find(filter).sort({ visitedAt: -1 }).lean();
      const formatted = visitors.map((v) => ({
        id: (v as any)._id.toString(),
        name: v.name,
        mobile: v.mobile,
        organization: v.organization,
        personToMeet: v.personToMeet,
        purpose: v.purpose,
        visitedAt: v.visitedAt,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
      }));

      res.status(200).json({
        success: true,
        count: formatted.length,
        source: 'mongodb',
        data: formatted,
      });
      return;
    }

    // In-memory fallback search and filter
    let results = [...inMemoryStore];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      results = results.filter(
        (v) =>
          v.name.toLowerCase().includes(lower) ||
          v.mobile.includes(lower) ||
          v.organization.toLowerCase().includes(lower) ||
          v.personToMeet.toLowerCase().includes(lower)
      );
    }

    // Sort newest first
    results.sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime());

    res.status(200).json({
      success: true,
      count: results.length,
      source: 'in-memory',
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/visitors/:id
 * @desc    Get a single visitor by ID
 * @access  Public
 */
export const getVisitorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (isMongoLive()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, message: 'Invalid visitor ID format' });
        return;
      }
      const visitor = await Visitor.findById(id).lean();
      if (!visitor) {
        res.status(404).json({ success: false, message: 'Visitor record not found' });
        return;
      }
      res.status(200).json({
        success: true,
        data: {
          id: (visitor as any)._id.toString(),
          name: visitor.name,
          mobile: visitor.mobile,
          organization: visitor.organization,
          personToMeet: visitor.personToMeet,
          purpose: visitor.purpose,
          visitedAt: visitor.visitedAt,
          createdAt: visitor.createdAt,
          updatedAt: visitor.updatedAt,
        },
      });
      return;
    }

    const visitor = inMemoryStore.find((v) => v.id === id);
    if (!visitor) {
      res.status(404).json({ success: false, message: 'Visitor record not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: visitor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/visitors
 * @desc    Register a new visitor
 * @access  Public
 */
export const createVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, mobile, organization, personToMeet, purpose } = req.body;
    const now = new Date();

    if (isMongoLive()) {
      const newVisitor = await Visitor.create({
        name,
        mobile,
        organization,
        personToMeet,
        purpose,
        visitedAt: now,
      });

      res.status(201).json({
        success: true,
        message: 'Visitor checked in successfully',
        data: {
          id: (newVisitor as any)._id.toString(),
          name: newVisitor.name,
          mobile: newVisitor.mobile,
          organization: newVisitor.organization,
          personToMeet: newVisitor.personToMeet,
          purpose: newVisitor.purpose,
          visitedAt: newVisitor.visitedAt,
          createdAt: newVisitor.createdAt,
          updatedAt: newVisitor.updatedAt,
        },
      });
      return;
    }

    // In-memory fallback
    const id = `vis_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const newVisitor: MemoryVisitor = {
      id,
      name,
      mobile,
      organization,
      personToMeet,
      purpose,
      visitedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    inMemoryStore.unshift(newVisitor);

    res.status(201).json({
      success: true,
      message: 'Visitor checked in successfully',
      data: newVisitor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/visitors/:id
 * @desc    Update visitor details
 * @access  Public
 */
export const updateVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, mobile, organization, personToMeet, purpose } = req.body;

    if (isMongoLive()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, message: 'Invalid visitor ID format' });
        return;
      }

      const updated = await Visitor.findByIdAndUpdate(
        id,
        {
          name,
          mobile,
          organization,
          personToMeet,
          purpose,
        },
        { new: true, runValidators: true }
      ).lean();

      if (!updated) {
        res.status(404).json({ success: false, message: 'Visitor record not found' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Visitor record updated successfully',
        data: {
          id: (updated as any)._id.toString(),
          name: updated.name,
          mobile: updated.mobile,
          organization: updated.organization,
          personToMeet: updated.personToMeet,
          purpose: updated.purpose,
          visitedAt: updated.visitedAt,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
        },
      });
      return;
    }

    const index = inMemoryStore.findIndex((v) => v.id === id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Visitor record not found' });
      return;
    }

    inMemoryStore[index] = {
      ...inMemoryStore[index],
      name,
      mobile,
      organization,
      personToMeet,
      purpose,
      updatedAt: new Date(),
    };

    res.status(200).json({
      success: true,
      message: 'Visitor record updated successfully',
      data: inMemoryStore[index],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/visitors/:id
 * @desc    Remove a visitor record
 * @access  Public
 */
export const deleteVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (isMongoLive()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, message: 'Invalid visitor ID format' });
        return;
      }

      const deleted = await Visitor.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Visitor record not found' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Visitor record deleted successfully',
      });
      return;
    }

    const index = inMemoryStore.findIndex((v) => v.id === id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Visitor record not found' });
      return;
    }

    inMemoryStore.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Visitor record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/visitors/stats/today
 * @desc    Get dashboard metrics: today's count, all-time count, and latest visitor
 * @access  Public
 */
export const getTodayStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    if (isMongoLive()) {
      const [todayCount, totalCount, latestVisitor] = await Promise.all([
        Visitor.countDocuments({ visitedAt: { $gte: startOfToday } }),
        Visitor.countDocuments({}),
        Visitor.findOne().sort({ visitedAt: -1 }).lean(),
      ]);

      res.status(200).json({
        success: true,
        data: {
          todayCount,
          totalCount,
          latestVisitor: latestVisitor
            ? {
                id: (latestVisitor as any)._id.toString(),
                name: latestVisitor.name,
                organization: latestVisitor.organization,
                purpose: latestVisitor.purpose,
                visitedAt: latestVisitor.visitedAt,
              }
            : null,
        },
      });
      return;
    }

    const todayCount = inMemoryStore.filter(
      (v) => new Date(v.visitedAt).getTime() >= startOfToday.getTime()
    ).length;
    const totalCount = inMemoryStore.length;
    const sorted = [...inMemoryStore].sort(
      (a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
    );
    const latestVisitor = sorted.length > 0 ? sorted[0] : null;

    res.status(200).json({
      success: true,
      data: {
        todayCount,
        totalCount,
        latestVisitor: latestVisitor
          ? {
              id: latestVisitor.id,
              name: latestVisitor.name,
              organization: latestVisitor.organization,
              purpose: latestVisitor.purpose,
              visitedAt: latestVisitor.visitedAt,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/visitors/export/csv
 * @desc    Export visitor list to CSV (respecting optional search filter)
 * @access  Public
 */
export const exportVisitorsCSV = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchTerm = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    let visitorList: Array<{
      name: string;
      mobile: string;
      organization: string;
      personToMeet: string;
      purpose: string;
      visitedAt: Date | string;
    }> = [];

    if (isMongoLive()) {
      let filter = {};
      if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        filter = {
          $or: [{ name: regex }, { mobile: regex }, { organization: regex }, { personToMeet: regex }],
        };
      }
      visitorList = await Visitor.find(filter).sort({ visitedAt: -1 }).lean();
    } else {
      let results = [...inMemoryStore];
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        results = results.filter(
          (v) =>
            v.name.toLowerCase().includes(lower) ||
            v.mobile.includes(lower) ||
            v.organization.toLowerCase().includes(lower) ||
            v.personToMeet.toLowerCase().includes(lower)
        );
      }
      results.sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime());
      visitorList = results;
    }

    // CSV Header row
    const headers = ['Visitor Name', 'Mobile Number', 'Organization', 'Person to Meet', 'Purpose', 'Check-In Timestamp'];
    const escapeCsv = (val: string | number | undefined | null) => {
      const str = String(val ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = visitorList.map((v) => [
      escapeCsv(v.name),
      escapeCsv(v.mobile),
      escapeCsv(v.organization),
      escapeCsv(v.personToMeet),
      escapeCsv(v.purpose),
      escapeCsv(new Date(v.visitedAt).toISOString()),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="visitors-register-${new Date().toISOString().split('T')[0]}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
