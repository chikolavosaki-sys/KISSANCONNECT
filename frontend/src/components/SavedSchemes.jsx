import React from 'react';

const SavedSchemes = ({ savedSchemes = [], onRemoveScheme }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>🔖</span> Saved & Bookmarked Schemes ({savedSchemes.length})
      </h3>

      {savedSchemes.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-sm font-medium">No saved schemes yet!</p>
          <p className="text-xs text-gray-400 mt-1">
            Bookmark schemes from the list to track them here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-lg border border-emerald-100"
            >
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  {scheme.category}
                </span>
                <h4 className="font-bold text-gray-900 text-sm mt-1">{scheme.title}</h4>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded transition"
                >
                  Apply ↗
                </a>
                <button
                  onClick={() => onRemoveScheme(scheme.id)}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold transition cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSchemes;