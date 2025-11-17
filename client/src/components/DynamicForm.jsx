import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formAPI } from '../services/api';

const DynamicForm = ({ onSuccess }) => {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchSchema();
  }, []);

  const fetchSchema = async () => {
    try {
      const response = await formAPI.getSchema();
      setSchema(response.data);
    } catch (error) {
      console.error('Error fetching schema:', error);
      setError('Failed to load form');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError('');

    try {
      await formAPI.submitForm(data);
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response?.data?.error || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error && !schema) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const renderField = (field) => {
    const commonProps = {
      ...register(field.name, {
        required: field.required ? `${field.label} is required` : false,
        min: field.min,
        max: field.max,
      }),
      id: field.name,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <input
            {...commonProps}
            type={field.type}
            className="input-field"
          />
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows="4"
            className="input-field"
          />
        );

      case 'select':
        return (
          <select {...commonProps} className="input-field">
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              {...commonProps}
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={field.name} className="ml-2 text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  // Group fields into sections
  const clientFields = schema?.fields?.slice(0, 3) || [];
  const bookingFields = schema?.fields?.slice(3, 10) || [];
  const costFields = schema?.fields?.slice(10) || [];

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Tour Booking Form</h2>
        <p className="text-sm text-gray-600 mt-1">
          Please fill out all required fields. Your submission will be reviewed by an admin.
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Client Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
            Client Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientFields.map((field) => (
              <div key={field.name} className={field.name === 'clientName' ? 'md:col-span-2' : ''}>
                {field.type !== 'checkbox' && (
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                
                {renderField(field)}

                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
            Booking Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookingFields.map((field) => (
              <div key={field.name}>
                {field.type !== 'checkbox' && (
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                
                {renderField(field)}

                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cost Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
            Cost & Payment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {costFields.map((field) => (
              <div key={field.name} className={field.name === 'additionalServices' ? 'md:col-span-2' : ''}>
                {field.type !== 'checkbox' && (
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                
                {renderField(field)}

                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Booking'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;

