import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  HelpCircle,
  FileCheck2,
  TrendingDown
} from 'lucide-react';
import { AmendmentComparison } from '../data/amendmentComparisonsData';

interface AmendmentComparisonCardProps {
  comparison: AmendmentComparison;
  compact?: boolean;
}

export const AmendmentComparisonCard: React.FC<AmendmentComparisonCardProps> = ({
  comparison,
  compact = false,
}) => {
  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-linear-to-br from-amber-50/80 via-white to-amber-50/40 p-4 sm:p-5 shadow-sm space-y-4 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-600 text-white text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{comparison.badge}</span>
          </span>
          <span className="text-xs font-semibold text-slate-700 font-mono bg-amber-100/80 px-2 py-0.5 rounded-sm">
            {comparison.actSection ? `${comparison.actSection} / ` : ''}नियम {comparison.ruleNumber}
          </span>
        </div>
        <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
          {comparison.topic}
        </h4>
      </div>

      {/* Before vs After Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Before Box (Red / Amber accent) */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wide mb-1.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>१६औँ संशोधनपूर्वको पुरानो व्यवस्था (पहिले के थियो?)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {comparison.beforeText}
            </p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-rose-200/60 text-[11px] text-rose-700 font-medium italic">
            ⚠️ यो पुरानो अभ्यास अब कानुन विपरित भइसकेको छ।
          </div>
        </div>

        {/* After Box (Emerald / Green accent) */}
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wide mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>१६औँ संशोधनपछिको हालको व्यवस्था (अहिले के छ?)</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              {comparison.afterText}
            </p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-emerald-200/70 text-[11px] text-emerald-800 font-bold">
            ✅ निर्णय र मूल्याङ्कन गर्दा अनिवार्य रूपमा यो व्यवस्था लागू गर्नुहोस्।
          </div>
        </div>
      </div>

      {/* Threshold Comparison Table if present */}
      {comparison.thresholds.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">मापदण्ड / सीमा</th>
                <th className="py-2 px-3 text-rose-800">पहिलेको सीमा</th>
                <th className="py-2 px-3 text-emerald-800">हालको १६औँ संशोधन सीमा</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparison.thresholds.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-slate-900">{t.label}</td>
                  <td className="py-2 px-3 text-slate-600 line-through decoration-rose-400">{t.oldValue}</td>
                  <td className="py-2 px-3 font-bold text-emerald-700 flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{t.newValue}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Warning / Caution */}
      <div className="rounded-xl border border-amber-300 bg-amber-100/70 p-3 flex items-start gap-2.5 text-xs text-amber-950">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-900 block mb-0.5">
            🚨 लेखापरीक्षण तथा अख्तियार सतर्कता (Audit Risk & Red Flag):
          </span>
          <p className="leading-relaxed">{comparison.auditRisk}</p>
        </div>
      </div>

      {/* Practical Takeaway */}
      <div className="text-xs text-slate-700 flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
        <span className="font-bold text-slate-900 shrink-0">💡 व्यवहारिक सल्लाह:</span>
        <span className="italic">{comparison.practicalTakeaway}</span>
      </div>
    </div>
  );
};
