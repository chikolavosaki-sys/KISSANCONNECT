{/* ================= MONTHLY FARMING EXPENSES BREAKDOWN ================= */}
<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
    <div>
      <h2 className="text-xl font-bold text-slate-800">📊 Monthly Farming Expenses & Subsidy Breakdown</h2>
      <p className="text-sm text-slate-500">Track month-wise operational costs and claimable government subsidies</p>
    </div>
    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-right">
      <span className="text-xs text-emerald-700 font-medium block">Total Net Out-of-Pocket (This Month)</span>
      <span className="text-lg font-extrabold text-emerald-800">₹4,300</span>
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm text-slate-600">
      <thead className="bg-slate-50 text-slate-700 uppercase text-xs">
        <tr>
          <th className="p-3">Category</th>
          <th className="p-3">Item / Service Details</th>
          <th className="p-3">Gross Cost (₹)</th>
          <th className="p-3">Govt Subsidy (₹)</th>
          <th className="p-3">Net Cost Paid (₹)</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        <tr className="hover:bg-slate-50">
          <td className="p-3 font-semibold text-slate-800">⚡ Electricity / Pump</td>
          <td className="p-3">Agri Pump Power (142 Units)</td>
          <td className="p-3 text-slate-700 font-medium">₹850</td>
          <td className="p-3 text-emerald-600 font-semibold">- ₹850 (100%)</td>
          <td className="p-3 font-bold text-slate-900">₹0</td>
          <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded">Waived</span></td>
        </tr>

        <tr className="hover:bg-slate-50">
          <td className="p-3 font-semibold text-slate-800">🌱 Seeds & Fertilizers</td>
          <td className="p-3">NPK Fertilizer + Paddy HYV Seeds</td>
          <td className="p-3 text-slate-700 font-medium">₹3,200</td>
          <td className="p-3 text-emerald-600 font-semibold">- ₹1,200 (DBT)</td>
          <td className="p-3 font-bold text-slate-900">₹2,000</td>
          <td className="p-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Subsidized</span></td>
        </tr>

        <tr className="hover:bg-slate-50">
          <td className="p-3 font-semibold text-slate-800">🚜 Machinery & Fuel</td>
          <td className="p-3">Tractor Rental & Field Plowing Diesel</td>
          <td className="p-3 text-slate-700 font-medium">₹1,800</td>
          <td className="p-3 text-slate-400 font-medium">₹0</td>
          <td className="p-3 font-bold text-slate-900">₹1,800</td>
          <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Paid</span></td>
        </tr>

        <tr className="hover:bg-slate-50">
          <td className="p-3 font-semibold text-slate-800">👨‍🌾 Labor Charges</td>
          <td className="p-3">Sowing & Field Preparation (2 Days)</td>
          <td className="p-3 text-slate-700 font-medium">₹1,000</td>
          <td className="p-3 text-emerald-600 font-semibold">- ₹500 (MGNREGA)</td>
          <td className="p-3 font-bold text-slate-900">₹500</td>
          <td className="p-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Subsidized</span></td>
        </tr>
      </tbody>
      <tfoot className="bg-slate-50 font-bold text-slate-800">
        <tr>
          <td colSpan="2" className="p-3 text-right">Total Monthly Expenditure:</td>
          <td className="p-3 text-slate-700">₹6,850</td>
          <td className="p-3 text-emerald-600">- ₹2,550</td>
          <td className="p-3 text-emerald-800 text-base">₹4,300</td>
          <td className="p-3"></td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>