import React, { useState } from 'react';

const SubmissionsList = ({ submissions, onUpdate }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Helper to get display name from data
  const getDisplayName = (data) => {
    return data.clientName || data.fullName || 'N/A';
  };

  if (submissions.length === 0) {
    return (
      <div className="card text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by filling out the booking form.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge badge-pending',
      approved: 'badge badge-approved',
      rejected: 'badge badge-rejected',
    };
    return badges[status] || 'badge';
  };

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div key={submission.id} className="card">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {getDisplayName(submission.data)}
                </h3>
                <span className={getStatusBadge(submission.status)}>
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600">
                {submission.data.destination && (
                  <span className="mr-4">📍 {submission.data.destination}</span>
                )}
                Submitted: {new Date(submission.createdAt).toLocaleString()}
              </p>

              {submission.status === 'pending' && (
                <div className="mt-3 flex items-center text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Waiting for admin approval
                </div>
              )}

              {submission.status === 'approved' && submission.pdfUrl && (
                <div className="mt-3">
                  <a
                    href={submission.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Download PDF Certificate
                  </a>
                </div>
              )}

              {submission.status === 'rejected' && submission.adminMessage && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-900">Rejection Reason:</p>
                  <p className="text-sm text-red-700 mt-1">{submission.adminMessage}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedSubmission(selectedSubmission?.id === submission.id ? null : submission)}
              className="ml-4 text-sm text-primary-600 hover:text-primary-700"
            >
              {selectedSubmission?.id === submission.id ? 'Hide Details' : 'View Details'}
            </button>
          </div>

          {selectedSubmission?.id === submission.id && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Submission Details</h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                {Object.entries(submission.data).map(([key, value]) => (
                  <div key={key} className="sm:col-span-1">
                    <dt className="text-xs font-medium text-gray-500 uppercase">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmissionsList;

