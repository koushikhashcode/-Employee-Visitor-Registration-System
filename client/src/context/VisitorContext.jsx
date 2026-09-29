import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api.js';
import { useDebounce } from '../hooks/useDebounce.js';

const VisitorContext = createContext(undefined);

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [dataSource, setDataSource] = useState('connecting');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add',
    visitor: null,
  });

  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const addToast = useCallback((toast) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const loadVisitors = useCallback(async (query) => {
    setLoading(true);
    try {
      const res = await api.getVisitors(query);
      // Defensive: handle both { data: [] } and plain array responses
      const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
      setVisitors(list);
      const source = res?.source || res?.data?.source || null;
      if (source) setDataSource(source);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Failed to load visitors',
        message: err.message || 'Check network connection',
      });
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await api.getTodayStats();
      setStats(res);
    } catch (err) {
      console.warn('Stats fetch warning:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVisitors(debouncedSearch);
  }, [debouncedSearch, loadVisitors]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refreshData = async () => {
    await Promise.all([loadVisitors(debouncedSearch), loadStats()]);
  };

  const addVisitor = async (data) => {
    try {
      const created = await api.createVisitor(data);
      setVisitors((prev) => [created, ...prev]);
      addToast({
        type: 'success',
        title: 'Visitor checked in',
        message: `${created.name} (${created.organization}) registered.`,
      });
      loadStats();
      closeModal();
      return { success: true };
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = err.response?.data?.message || err.message || 'Unable to register visitor';
      addToast({
        type: 'error',
        title: 'Registration failed',
        message,
      });
      return { success: false, errors };
    }
  };

  const editVisitor = async (id, data) => {
    try {
      const updated = await api.updateVisitor(id, data);
      setVisitors((prev) => prev.map((v) => (v.id === id ? updated : v)));
      addToast({
        type: 'success',
        title: 'Visitor details updated',
        message: `${updated.name}'s record has been saved.`,
      });
      loadStats();
      closeModal();
      return { success: true };
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = err.response?.data?.message || err.message || 'Unable to update record';
      addToast({
        type: 'error',
        title: 'Update failed',
        message,
      });
      return { success: false, errors };
    }
  };

  const removeVisitor = async (id) => {
    try {
      await api.deleteVisitor(id);
      setVisitors((prev) => prev.filter((v) => v.id !== id));
      addToast({
        type: 'info',
        title: 'Visitor record deleted',
        message: 'The record was permanently removed from the register.',
      });
      loadStats();
      setDeleteCandidate(null);
      return true;
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Failed to delete record',
        message: err.message || 'Please try again.',
      });
      return false;
    }
  };

  const exportCsv = async () => {
    try {
      await api.exportVisitorsCsv(debouncedSearch);
      addToast({
        type: 'success',
        title: 'Export generated',
        message: 'The CSV visitor register was downloaded.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Export failed',
        message: err.message || 'Unable to generate CSV.',
      });
    }
  };

  const openAddModal = () => {
    setModalState({
      isOpen: true,
      mode: 'add',
      visitor: null,
    });
  };

  const openEditModal = (visitor) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      visitor,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <VisitorContext.Provider
      value={{
        visitors,
        loading,
        stats,
        statsLoading,
        searchQuery,
        setSearchQuery,
        debouncedSearch,
        refreshData,
        addVisitor,
        editVisitor,
        removeVisitor,
        exportCsv,
        modalState,
        openAddModal,
        openEditModal,
        closeModal,
        deleteCandidate,
        setDeleteCandidate,
        toasts,
        addToast,
        removeToast,
        dataSource,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitors = () => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitors must be used within a VisitorProvider');
  }
  return context;
};
