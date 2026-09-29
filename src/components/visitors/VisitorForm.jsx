import React, { useState } from 'react';
import { AlertCircle, Clock, ArrowRight, Check } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';
import { VISITOR_PURPOSE_OPTIONS } from '../../types/visitor.js';

const initialFormData = { name: '', mobile: '', organization: '', personToMeet: '', purpose: '' };

export const VisitorForm = ({ initialVisitor, onCancel, onSuccess }) => {
  const { addVisitor, editVisitor } = useVisitors();
  const isEditing = Boolean(initialVisitor);

  const [formData, setFormData] = useState(
    isEditing
      ? { name: initialVisitor.name, mobile: initialVisitor.mobile, organization: initialVisitor.organization, personToMeet: initialVisitor.personToMeet, purpose: initialVisitor.purpose }
      : initialFormData
  );
  const [errors, setErrors]       = useState({});
  const [touched, setTouched]     = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'VISITOR NAME IS REQUIRED';
        if (value.trim().length < 2) return 'NAME MUST BE AT LEAST 2 CHARACTERS';
        return undefined;
      case 'mobile':
        if (!value.trim()) return 'MOBILE NUMBER IS REQUIRED';
        if (!/^\d{10}$/.test(value.trim())) return 'MUST BE EXACTLY 10 DIGITS';
        return undefined;
      case 'organization':
        if (!value.trim()) return 'ORGANIZATION IS REQUIRED';
        if (value.trim().length < 2) return 'ORGANIZATION MUST BE AT LEAST 2 CHARACTERS';
        return undefined;
      case 'personToMeet':
        if (!value.trim()) return 'PERSON TO MEET (HOST) IS REQUIRED';
        if (value.trim().length < 2) return 'HOST NAME MUST BE AT LEAST 2 CHARACTERS';
        return undefined;
      case 'purpose':
        if (!value) return 'PURPOSE OF VISIT IS REQUIRED';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    let val = value;
    if (field === 'mobile') val = value.replace(/[^\d]/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const error = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, mobile: true, organization: true, personToMeet: true, purpose: true });
      return;
    }
    setSubmitting(true);
    const payload = {
      name:         formData.name.trim(),
      mobile:       formData.mobile.trim(),
      organization: formData.organization.trim(),
      personToMeet: formData.personToMeet.trim(),
      purpose:      formData.purpose,
    };
    const result = isEditing && initialVisitor
      ? await editVisitor(initialVisitor.id, payload)
      : await addVisitor(payload);
    setSubmitting(false);
    if (result.success) onSuccess();
    else if (result.errors) setErrors(result.errors);
  };

  return (
    <form onSubmit={handleSubmit} className="visitor-form">
      {/* Name */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          VISITOR FULL NAME <span className="form-required">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="E.G. ALEX MORGAN"
          className={`form-input${errors.name ? ' error' : ''}`}
        />
        {errors.name && (
          <div className="form-error-msg">
            <AlertCircle size={14} />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="form-group">
        <label htmlFor="mobile" className="form-label">
          MOBILE PHONE NUMBER <span className="form-required">*</span>
        </label>
        <div className={`form-mobile-wrapper${errors.mobile ? ' error' : ''}`}>
          <div className="form-mobile-prefix font-mono-numbers">+91</div>
          <input
            id="mobile"
            type="tel"
            inputMode="numeric"
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            onBlur={() => handleBlur('mobile')}
            placeholder="9876543210"
            className="form-mobile-input font-mono-numbers"
          />
        </div>
        {errors.mobile ? (
          <div className="form-error-msg">
            <AlertCircle size={14} />
            <span>{errors.mobile}</span>
          </div>
        ) : (
          <p className="form-hint">EXACTLY 10 NUMERICAL DIGITS FOR GATE PASS</p>
        )}
      </div>

      {/* Organization */}
      <div className="form-group">
        <label htmlFor="organization" className="form-label">
          COMPANY / COLLEGE / ORGANIZATION <span className="form-required">*</span>
        </label>
        <input
          id="organization"
          type="text"
          value={formData.organization}
          onChange={(e) => handleChange('organization', e.target.value)}
          onBlur={() => handleBlur('organization')}
          placeholder="E.G. ACME CORP / STANFORD"
          className={`form-input${errors.organization ? ' error' : ''}`}
        />
        {errors.organization && (
          <div className="form-error-msg">
            <AlertCircle size={14} />
            <span>{errors.organization}</span>
          </div>
        )}
      </div>

      {/* Person To Meet */}
      <div className="form-group">
        <label htmlFor="personToMeet" className="form-label">
          PERSON TO MEET (HOST) <span className="form-required">*</span>
        </label>
        <input
          id="personToMeet"
          type="text"
          value={formData.personToMeet}
          onChange={(e) => handleChange('personToMeet', e.target.value)}
          onBlur={() => handleBlur('personToMeet')}
          placeholder="E.G. ELENA ROSTOVA (HR LEAD)"
          className={`form-input${errors.personToMeet ? ' error' : ''}`}
        />
        {errors.personToMeet && (
          <div className="form-error-msg">
            <AlertCircle size={14} />
            <span>{errors.personToMeet}</span>
          </div>
        )}
      </div>

      {/* Purpose */}
      <div className="form-group">
        <label className="form-label">
          PURPOSE OF VISIT <span className="form-required">*</span>
        </label>
        <div className="form-purpose-grid">
          {VISITOR_PURPOSE_OPTIONS.map((purpose) => {
            const isSelected = formData.purpose === purpose;
            return (
              <button
                key={purpose}
                type="button"
                onClick={() => handleChange('purpose', purpose)}
                className={`form-purpose-btn ${isSelected ? 'selected' : 'unselected'}`}
              >
                <span className="form-purpose-label">{purpose}</span>
                <span className={`form-purpose-check ${isSelected ? 'checked' : 'unchecked'}`}>
                  {isSelected && <Check size={14} strokeWidth={3.5} />}
                </span>
              </button>
            );
          })}
        </div>
        {errors.purpose && (
          <div className="form-error-msg">
            <AlertCircle size={14} />
            <span>{errors.purpose}</span>
          </div>
        )}
      </div>

      {/* Auto Timestamp */}
      <div className="form-timestamp">
        <div className="form-timestamp-label">
          <Clock size={16} strokeWidth={2.5} />
          AUTO TIME-STAMP
        </div>
        <span className="form-timestamp-value font-mono-numbers">
          {isEditing && initialVisitor
            ? new Date(initialVisitor.visitedAt).toLocaleString()
            : 'PINNED ON CHECK-IN'}
        </span>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="brutal-btn form-btn-cancel"
        >
          CANCEL
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="brutal-btn form-btn-submit"
        >
          <span className="form-submit-inner">
            {submitting && <span className="animate-spin form-spinner" />}
            <span>{isEditing ? 'SAVE CHANGES' : 'CONFIRM & LOG VISIT'}</span>
          </span>
          <span className="form-submit-arrow">
            <ArrowRight size={16} strokeWidth={3} />
          </span>
        </button>
      </div>
    </form>
  );
};
