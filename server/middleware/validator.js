import { VISITOR_PURPOSES } from '../models/Visitor.js';

export const validateVisitorInput = (req, res, next) => {
  const { name, mobile, organization, personToMeet, purpose } = req.body;
  const errors = {};

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters';
  } else if (name.trim().length > 100) {
    errors.name = 'Full name must not exceed 100 characters';
  }

  // Mobile validation: 10 digits
  if (!mobile || typeof mobile !== 'string' || mobile.trim().length === 0) {
    errors.mobile = '10-digit mobile number is required';
  } else {
    const cleanedMobile = mobile.trim().replace(/[\s-]/g, '');
    if (!/^\d{10}$/.test(cleanedMobile)) {
      errors.mobile = 'Mobile number must be exactly 10 numerical digits';
    }
  }

  // Organization validation
  if (!organization || typeof organization !== 'string' || organization.trim().length === 0) {
    errors.organization = 'Company or college name is required';
  } else if (organization.trim().length < 2) {
    errors.organization = 'Organization name must be at least 2 characters';
  }

  // Person to meet validation
  if (!personToMeet || typeof personToMeet !== 'string' || personToMeet.trim().length === 0) {
    errors.personToMeet = 'Person to meet is required';
  } else if (personToMeet.trim().length < 2) {
    errors.personToMeet = 'Person to meet must be at least 2 characters';
  }

  // Purpose validation
  if (!purpose || typeof purpose !== 'string' || purpose.trim().length === 0) {
    errors.purpose = 'Purpose of visit is required';
  } else if (!VISITOR_PURPOSES.includes(purpose)) {
    errors.purpose = `Purpose must be one of: ${VISITOR_PURPOSES.join(', ')}`;
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted fields.',
      errors,
    });
    return;
  }

  // Sanitize fields before passing to controllers
  req.body.name = name.trim();
  req.body.mobile = mobile.trim().replace(/[\s-]/g, '');
  req.body.organization = organization.trim();
  req.body.personToMeet = personToMeet.trim();
  req.body.purpose = purpose.trim();

  next();
};
