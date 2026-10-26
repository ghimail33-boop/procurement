import React, { useMemo, useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Edit3,
  RotateCcw,
  Search,
  BookOpen,
  Scale,
  Sparkles,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  BIDDING_FORM_TEMPLATES,
  BIDDING_FORMS_CATEGORIES,
  BiddingFormTemplate,
} from '../data/biddingFormsData';

interface BiddingFormsGeneratorProps {
  initialFormId?: string;
  onSelectForm?: (formId: string) => void;
  hideHeader?: boolean;
}

export const BiddingFormsGenerator: React.FC<BiddingFormsGeneratorProps> = ({
  initialFormId,
  hideHeader = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFormId, setActiveFormId] = useState<string>(
    initialFormId || BIDDING_FORM_TEMPLATES[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditingInline, setIsEditingInline] = useState<boolean>(false);
  const [inlineContent, setInlineContent] = useState<string>('');

  // Store custom field values per form
  const [formFieldValues, setFormFieldValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    BIDDING_FORM_TEMPLATES.forEach((form) => {
      initial[form.id] = {};
      form.fields.forEach((f) => {
        initial[form.id][f.key] = f.defaultValue;
      });
    });
    return initial;
  });

  const activeForm = useMemo(() => {
    return (
      BIDDING_FORM_TEMPLATES.find((f) => f.id === activeFormId) ||
      BIDDING_FORM_TEMPLATES[0]
    );
  }, [activeFormId]);

  const filteredForms = useMemo(() => {
    return BIDDING_FORM_TEMPLATES.filter((form) => {
      const matchesCategory =
        selectedCategory === 'all' || form.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        form.titleNepali.toLowerCase().includes(q) ||
        form.titleEnglish.toLowerCase().includes(q) ||
        form.legalReference.toLowerCase().includes(q) ||
        form.sbdSection.toLowerCase().includes(q) ||
        form.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const currentValues = formFieldValues[activeForm.id] || {};

  const generatedContent = useMemo(() => {
    if (isEditingInline && inlineContent) {
      return inlineContent;
    }
    return activeForm.contentTemplate(currentValues);
  }, [activeForm, currentValues, isEditingInline, inlineContent]);

  const handleFieldChange = (key: string, value: string) => {
    setFormFieldValues((prev) => ({
      ...prev,
      [activeForm.id]: {
        ...(prev[activeForm.id] || {}),
        [key]: value,
      },
    }));
    if (isEditingInline) {
      setIsEditingInline(false);
    }
  };

  const handleResetFields = () => {
    const defaults: Record<string, string> = {};
    activeForm.fields.forEach((f) => {
      defaults[f.key] = f.defaultValue;
    });
    setFormFieldValues((prev) => ({
      ...prev,
      [activeForm.id]: defaults,
    }));
    setIsEditingInline(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleInlineEdit = () => {
    if (!isEditingInline) {
      setInlineContent(activeForm.contentTemplate(currentValues));
    }
    setIsEditingInline(!isEditingInline);
  };

  return (
    <div className="space-y-6">
      {/* Header Card (Hidden if top portal banner replaces it) */}
      {!hideHeader && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>PPMO Standard Bidding Documents (SBD) • Section IV</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                बोलपत्र फाराम तथा आधिकारिक ढाँचा जेनेरेटर
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                सार्वजनिक खरिद अनुगमन कार्यालय (PPMO) का SBDs (Works, Goods, Services, SQ) अनुसार बोलपत्रदाताहरूले पेश गर्नुपर्ने फारामहरू आफ्ना विवरण भरी तुरुन्तै प्रिन्ट वा कपी गर्नुहोस्।
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-xs bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 shadow-2xs">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                {BIDDING_FORM_TEMPLATES.length} आधिकारिक फारामहरू उपलब्ध
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Categories & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {BIDDING_FORMS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="फाराम खोज्नुहोस्..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Main Workspace: 2-Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Selector & Parameter Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Form Selector List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center justify-between">
              <span>उपलब्ध फारामहरू ({filteredForms.length})</span>
              <span className="text-[10px] text-blue-700 font-normal">क्लिक गरी छान्नुहोस्</span>
            </h2>
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
              {filteredForms.map((form) => {
                const isActive = form.id === activeForm.id;
                return (
                  <button
                    key={form.id}
                    onClick={() => {
                      setActiveFormId(form.id);
                      setIsEditingInline(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 border border-blue-200 text-blue-900 font-medium shadow-2xs'
                        : 'hover:bg-slate-50 border border-transparent text-slate-700'
                    }`}
                  >
                    <FileText
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isActive ? 'text-blue-700' : 'text-slate-400'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold leading-snug truncate">
                        {form.titleNepali}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {form.sbdSection}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Field Parameters Customizer */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  विवरण सम्पादन गर्नुहोस्
                </h3>
                <p className="text-[11px] text-slate-500">
                  तलका विवरण फेर्दा ढाँचामा स्वतः परिमार्जन हुनेछ
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFields}
                className="text-[11px] text-slate-500 hover:text-blue-700 flex items-center gap-1 font-medium transition-colors"
                title="सुरुवाती मानहरूमा फर्काउनुहोस्"
              >
                <RotateCcw className="w-3 h-3" />
                <span>पूर्वनिर्धारित मान</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {activeForm.fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 block">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={currentValues[field.key] ?? field.defaultValue}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all text-slate-900"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Legal Compliance Box */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-1.5 text-amber-950">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Scale className="w-4 h-4 text-amber-700 shrink-0" />
              <span>कानूनी आधार तथा PPMO निर्देशन:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900/90">
              {activeForm.legalReference} | {activeForm.sbdSection}
            </p>
            <p className="text-[11px] text-amber-800 leading-normal">
              {activeForm.description}
            </p>
          </div>
        </div>

        {/* Right Column: Live Document Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Action Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                कागजात पूर्वावलोकन (Preview)
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">
                {activeForm.categoryNepali}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleToggleInlineEdit}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isEditingInline
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="कागजात सिधै टाइप गरी सम्पादन गर्नुहोस्"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingInline ? 'सम्पादन बन्द' : 'प्रत्यक्ष सम्पादन'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  copied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-blue-700 hover:bg-blue-800 text-white shadow-2xs'
                }`}
                title="कागजात कपी गर्नुहोस्"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>कपी भयो!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>कपी गर्नुहोस्</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                title="कागजात प्रिन्ट गर्नुहोस्"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>प्रिन्ट</span>
              </button>
            </div>
          </div>

          {/* Form Preview Paper */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 min-h-[580px] font-sans text-slate-900 relative">
            <div className="border-b border-slate-200 pb-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <div>
                <span className="font-bold text-slate-800">{activeForm.titleNepali}</span>
                <span className="block text-[11px] text-slate-400">{activeForm.titleEnglish}</span>
              </div>
              <div className="text-right text-[11px]">
                <span className="font-semibold text-blue-900">{activeForm.sbdSection}</span>
              </div>
            </div>

            {isEditingInline ? (
              <textarea
                value={inlineContent}
                onChange={(e) => setInlineContent(e.target.value)}
                className="w-full h-[520px] p-4 text-xs sm:text-sm font-mono leading-relaxed bg-amber-50/40 border border-amber-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            ) : (
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-slate-800 selection:bg-blue-100 selection:text-blue-900">
                {generatedContent}
              </pre>
            )}

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 no-print">
              <span>* PPMO को SBD Section IV को नमूना अनुसार तयार गरिएको</span>
              <span>सार्वजनिक खरिद सहयोगी • बोलपत्रदाता मोड</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
