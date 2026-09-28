import React, { useState } from 'react';
import { FileSpreadsheet, CheckCircle, TrendingUp, Users, ArrowRight, ShieldCheck, Zap, Factory, FileText, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoiCalculator({ t, lang, onOpenQuote }) {
  const [productType, setProductType] = useState('rajgira');
  const [dailyLaddus, setDailyLaddus] = useState(1500);
  const [ladduPrice, setLadduPrice] = useState(8);
  const [rawMaterialCost, setRawMaterialCost] = useState(3.5);

  const data = t.calculator;

  const handleProductPreset = (type) => {
    setProductType(type);
    if (type === 'rajgira') {
      setLadduPrice(8);
      setRawMaterialCost(3.5);
    } else {
      setLadduPrice(6);
      setRawMaterialCost(2.2);
    }
  };

  // Business Economics (26 working days/month)
  const workingDays = 26;
  const monthlyLaddus = dailyLaddus * workingDays;
  const monthlyRevenue = Math.round(monthlyLaddus * ladduPrice);
  const monthlyRawCost = Math.round(monthlyLaddus * rawMaterialCost);

  // Machine time & operating costs
  const machineHours = Number((dailyLaddus / 1000).toFixed(1));
  const operatorWage = 10000;
  const monthlyPowerCost = Math.round(machineHours * workingDays * 8); // ₹8-₹12 per day
  const monthlyPackaging = Math.round(monthlyLaddus * 0.15); // ~15 paise per laddu
  const monthlyOperating = operatorWage + monthlyPowerCost + monthlyPackaging;

  // Manual Karigar savings comparison
  const manualWorkers = Math.max(2, Math.ceil(dailyLaddus / 400));
  const manualLaborCost = manualWorkers * 11000;
  const monthlyLaborSaved = Math.max(0, manualLaborCost - operatorWage);

  // Net Profit & Daily breakdown
  const totalExpenses = monthlyRawCost + monthlyOperating;
  const netMonthlyProfit = Math.max(0, monthlyRevenue - totalExpenses);
  const dailyNetProfit = Math.round(netMonthlyProfit / workingDays);
  const profitMargin = monthlyRevenue > 0 ? Math.round((netMonthlyProfit / monthlyRevenue) * 100) : 0;

  const triggerCelebrate = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    onOpenQuote();
  };

  const dailyPresets = [1000, 1500, 2000, 3000];

  return (
    <section id="calculator" className="py-14 sm:py-20 bg-slate-100/90 relative border-b border-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-100/80 border border-brand-blue-300 text-brand-blue-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5">
            <FileSpreadsheet className="w-4 h-4 text-brand-blue-700" />
            <span>{lang === 'mr' ? 'प्रकल्प अहवाल व नफ्याचे गणित' : lang === 'hi' ? 'प्रोजेक्ट रिपोर्ट व नफे का गणित' : 'Business Feasibility & ROI'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {data.title}
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Authentic Business Planning Document / Ledger Box */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          
          {/* Top Document Header Bar (Soft Low-Opacity Orange Theme) */}
          <div className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-400/15 border-b border-orange-200/80 px-5 sm:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-orange-600" />
                <span className="font-black text-base sm:text-lg tracking-wide text-slate-900">
                  {lang === 'mr' ? 'लाडू उत्पादन व्यवसाय ताळेबंद' : lang === 'hi' ? 'लड्डू निर्माण व्यवसाय बैलेंस शीट' : 'Laddu Production P&L Statement'}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {lang === 'mr' ? '२६ कामकाजाचे दिवस • प्रत्यक्ष कारखान्यातील प्रत्यक्ष खर्चावर आधारित' : lang === 'hi' ? '26 कार्य दिवस • कारखाने के वास्तविक खर्चों पर आधारित' : '26 working days per month • Based on real factory costs'}
              </p>
            </div>

            {/* Product Preset Tabs */}
            <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl border border-orange-200/90 shadow-sm">
              <button
                type="button"
                onClick={() => handleProductPreset('rajgira')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  productType === 'rajgira'
                    ? 'bg-orange-600 text-white shadow-sm font-black'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                🌾 {data.presetRajgira}
              </button>
              <button
                type="button"
                onClick={() => handleProductPreset('murmura')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  productType === 'murmura'
                    ? 'bg-orange-600 text-white shadow-sm font-black'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                🍯 {data.presetMurmura}
              </button>
            </div>
          </div>

          {/* Equal-Height 2-Column Working Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 items-stretch">
            
            {/* Column 1: Production Parameters */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-blue-600"></span>
                    {lang === 'mr' ? '१. उत्पादन व दर अंदाज (Production Inputs)' : lang === 'hi' ? '१. उत्पादन व दर अनुमान (Inputs)' : '1. Production Parameters'}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                    {monthlyLaddus.toLocaleString()} {lang === 'mr' ? 'लाडू / महिना' : lang === 'hi' ? 'लड्डू / माह' : 'laddus/mo'}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Slider 1: Daily Production */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs sm:text-sm font-black text-slate-800">
                        {data.sliderLaddus}
                      </label>
                      <span className="text-sm font-black text-brand-blue-900 bg-brand-blue-100 px-3 py-1 rounded-md border border-brand-blue-300">
                        {dailyLaddus.toLocaleString()} {lang === 'mr' ? 'लाडू/दिवस' : lang === 'hi' ? 'लड्डू/दिन' : 'laddus/day'}
                      </span>
                    </div>

                    {/* Quick Select Chips */}
                    <div className="flex items-center gap-1.5 my-2">
                      {dailyPresets.map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setDailyLaddus(qty)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded border transition-all ${
                            dailyLaddus === qty
                              ? 'bg-brand-blue-600 text-white border-brand-blue-600'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {qty.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <input
                      type="range"
                      min="500"
                      max="4000"
                      step="100"
                      value={dailyLaddus}
                      onChange={(e) => setDailyLaddus(Number(e.target.value))}
                      className="w-full h-2 bg-slate-300 rounded appearance-none cursor-pointer accent-brand-blue-700"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
                      <span>{lang === 'mr' ? 'किमान: ५०० लाडू' : lang === 'hi' ? 'न्यूनतम: 500 लड्डू' : 'Min: 500 laddus'}</span>
                      <span>{lang === 'mr' ? 'मशीन कमाल क्षमता: ४,०००+ लाडू' : lang === 'hi' ? 'अधिकतम क्षमता: 4,000+ लड्डू' : 'Max Capacity: 4,000+ laddus'}</span>
                    </div>
                  </div>

                  {/* Slider 2: Selling Price Per Laddu */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs sm:text-sm font-black text-slate-800">
                        {data.sliderPrice}
                      </label>
                      <span className="text-sm font-black text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300">
                        ₹{ladduPrice.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="15"
                      step="0.5"
                      value={ladduPrice}
                      onChange={(e) => setLadduPrice(Number(e.target.value))}
                      className="w-full h-2 bg-slate-300 rounded appearance-none cursor-pointer accent-emerald-700"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
                      <span>{lang === 'mr' ? 'घाऊक भाव: ₹४ ते ₹६' : lang === 'hi' ? 'थोक भाव: ₹4 से ₹6' : 'Wholesale: ₹4 - ₹6'}</span>
                      <span>{lang === 'mr' ? 'किरकोळ भाव: ₹८ ते ₹१५' : lang === 'hi' ? 'खुदरा भाव: ₹8 से ₹15' : 'Retail: ₹8 - ₹15'}</span>
                    </div>
                  </div>

                  {/* Slider 3: Raw Material Cost Per Laddu */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs sm:text-sm font-black text-slate-800">
                        {data.sliderCost}
                      </label>
                      <span className="text-sm font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                        ₹{rawMaterialCost.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="8"
                      step="0.1"
                      value={rawMaterialCost}
                      onChange={(e) => setRawMaterialCost(Number(e.target.value))}
                      className="w-full h-2 bg-slate-300 rounded appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
                      <span>{lang === 'mr' ? 'गूळ, धान्य व गॅस खर्च (प्रति लाडू सरासरी ₹२.२० ते ₹३.५०)' : lang === 'hi' ? 'गुड़, अनाज व गैस खर्च (प्रति लड्डू औसत ₹2.20 से ₹3.50)' : 'Jaggery, grain & gas cost (~₹2.20 - ₹3.50/laddu)'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real World Labor Savings Box */}
              <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border-2 border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black uppercase text-amber-900">
                      {lang === 'mr' ? 'पारंपरिक पद्धतीशी तुलना (मजुरी बचत):' : lang === 'hi' ? 'पारंपरिक लेबर से तुलना (बचत):' : 'Labor Cost Savings:'}
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                      {lang === 'mr' 
                        ? `हाताने एवढे लाडू वळण्यासाठी ${manualWorkers} कारागीर लागतात. मशीनवर फक्त १ व्यक्ती पुरेशी आहे.`
                        : lang === 'hi'
                        ? `हाथ से इतने लड्डू बनाने के लिए ${manualWorkers} कारीगर चाहिए, मशीन पर सिर्फ 1 व्यक्ति काफी है।`
                        : `Rolling these laddus manually requires ${manualWorkers} workers. With the machine, just 1 person is needed.`}
                    </p>
                    <div className="mt-2 text-sm font-black text-amber-950 flex items-center justify-between border-t border-amber-200 pt-1.5">
                      <span>{lang === 'mr' ? 'थेट वाचणारा कामगार पगार:' : lang === 'hi' ? 'सीधी लेबर वेतन बचत:' : 'Direct Labor Wages Saved:'}</span>
                      <span className="text-base text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                        + ₹{monthlyLaborSaved.toLocaleString()} / {lang === 'mr' ? 'महिना' : lang === 'hi' ? 'माह' : 'mo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Authentic Financial Ledger / P&L Sheet */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                {/* Ledger Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {lang === 'mr' ? '२. मासिक ताळेबंद (P&L Breakdown)' : lang === 'hi' ? '2. मासिक आय-व्यय (P&L Breakdown)' : '2. Monthly P&L Ledger'}
                  </span>
                  <span className="text-xs font-black px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {profitMargin}% {lang === 'mr' ? 'निव्वळ नफा मार्जिन' : lang === 'hi' ? 'शुद्ध लाभ मार्जिन' : 'Net Margin'}
                  </span>
                </div>

                {/* Accounting Line Items */}
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs sm:text-sm">
                  {/* Row 1: Total Revenue */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-black">+</span>
                      <span className="font-bold text-slate-800">{data.monthlySales}</span>
                    </div>
                    <span className="font-black text-slate-900 text-sm sm:text-base">
                      ₹{monthlyRevenue.toLocaleString()}
                    </span>
                  </div>

                  {/* Row 2: Raw Material Cost */}
                  <div className="flex items-center justify-between p-3 bg-white border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px] font-black">-</span>
                      <div>
                        <span className="font-semibold text-slate-700">{data.rawCostTotal}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">{lang === 'mr' ? 'गूळ, राजगिरा/मुरमुरा व गॅस' : lang === 'hi' ? 'गुड़, राजगिरा/मुरमुरा और गैस' : 'Jaggery, ingredients & gas'}</span>
                      </div>
                    </div>
                    <span className="font-bold text-rose-700">
                      - ₹{monthlyRawCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Row 3: Operator Salary */}
                  <div className="flex items-center justify-between p-3 bg-slate-50/70 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center text-[11px] font-black">-</span>
                      <div>
                        <span className="font-semibold text-slate-700">{lang === 'mr' ? 'ऑपरेटर मानधन / पगार (१ व्यक्ती)' : lang === 'hi' ? 'ऑपरेटर वेतन (1 व्यक्ति)' : 'Operator Salary (1 Person)'}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">{lang === 'mr' ? 'दररोज अवघे ३-४ तास काम' : lang === 'hi' ? 'प्रतिदिन मात्र 3-4 घंटे कार्य' : 'Only 3-4 hrs daily'}</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700">
                      - ₹{operatorWage.toLocaleString()}
                    </span>
                  </div>

                  {/* Row 4: Power & Packaging */}
                  <div className="flex items-center justify-between p-3 bg-white border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center text-[11px] font-black">-</span>
                      <div>
                        <span className="font-semibold text-slate-700">{lang === 'mr' ? 'घरगुती वीज व पॅकिंग खर्च' : lang === 'hi' ? 'घरेलू बिजली और पैकिंग खर्च' : 'Domestic Power & Packaging Cost'}</span>
                        <span className="block text-[10px] text-slate-400 font-medium">{lang === 'mr' ? '२२०V वीज ₹८/दिवस + प्लास्टिक पॅकिंग' : lang === 'hi' ? '220V बिजली ₹8/दिन + पैकिंग खर्च' : '220V power ₹8/day + packing'}</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700">
                      - ₹{(monthlyPowerCost + monthlyPackaging).toLocaleString()}
                    </span>
                  </div>

                  {/* Total Cost Row */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-100 font-bold text-slate-600 text-[11px] sm:text-xs">
                    <span>{lang === 'mr' ? 'एकूण मासिक खर्च (Total Expense):' : lang === 'hi' ? 'कुल मासिक खर्च (Total Expense):' : 'Total Monthly Expenses:'}</span>
                    <span className="text-slate-800 font-extrabold">- ₹{totalExpenses.toLocaleString()}</span>
                  </div>
                </div>

                {/* Net Profit Summary Box */}
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                      {lang === 'mr' ? 'हातात उरणारा निव्वळ मासिक नफा:' : lang === 'hi' ? 'हाथ में आने वाला शुद्ध मासिक लाभ:' : 'Net In-Hand Monthly Profit:'}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                      {lang === 'mr' ? `दररोज ₹${dailyNetProfit.toLocaleString()} नफा` : lang === 'hi' ? `प्रतिदिन ₹${dailyNetProfit.toLocaleString()} लाभ` : `₹${dailyNetProfit.toLocaleString()}/day net`}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-800 tracking-tight">
                    ₹{netMonthlyProfit.toLocaleString()}
                    <span className="text-sm sm:text-base font-bold text-emerald-700 ml-1">
                      /{lang === 'mr' ? 'महिना' : lang === 'hi' ? 'माह' : 'mo'}*
                    </span>
                  </div>

                  <p className="text-xs text-emerald-900 font-bold mt-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{data.paybackMsg}</span>
                  </p>
                </div>
              </div>

              {/* Call to Action Button & Disclaimer */}
              <div className="mt-6 pt-3 border-t border-slate-200 space-y-2">
                <button
                  type="button"
                  onClick={triggerCelebrate}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-black py-3.5 px-5 rounded-xl shadow-md transition-all active:scale-[0.99] text-sm sm:text-base tracking-wide"
                >
                  <FileText className="w-5 h-5 text-amber-300" />
                  <span>{lang === 'mr' ? 'या हिशोबाचे कोटेशन व प्रोजेक्ट समरी मागवा' : lang === 'hi' ? 'इस हिसाब का कोटेशन व प्रोजेक्ट समरी मंगाएं' : 'Request Official Quote & Profit Summary'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-500 text-center font-medium leading-tight">
                  {lang === 'mr'
                    ? '*टीप: हा ताळेबंद चालू बाजारभावावर आधारित आहे. प्रत्यक्ष कच्चा माल व स्थानिक विक्री भावानुसार नफा कमी-जास्त होऊ शकतो.'
                    : lang === 'hi'
                    ? '*नोट: यह गणना बाजार भाव पर आधारित है। स्थानीय कच्चा माल व बिक्री दर के अनुसार मुनाफा बढ़ सकता है।'
                    : '*Note: Estimates based on current market rates. Actual margins may vary based on local ingredient prices.'}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


