// "use client";
// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UploadDummyNews() {
//   const [loading, setLoading] = useState(false);

//   const categories = [
//     { id: "0a4b3d2d-2e28-4308-0e4a-08de14636697", name: "اخبار الاسمنت" },
//     { id: "1a604407-cf46-482b-0e4b-08de14636697", name: "اخبار عامة" },
//     { id: "e38adb0e-8aea-4bf5-0e4c-08de14636697", name: "اخبار الاسمنت حول العالم" },
//   ];

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDZW1lbnRFZ3lwdCIsImp0aSI6Ijg4NjgyMThiLWNmYzktNGQyYi04N2UwLWFmYWNhMzM0N2FmNiIsImVtYWlsIjoiQ2VtZW50RWd5cHRAY2VtZW50RWd5cHQuY29tIiwidXNlclR5cGUiOiJTdXBlckFkbWluIiwidXVpZCI6IjA0MGU0OTUwLWRiNzgtNDQ5OC1hZWMyLWQ2ZTA4OWU4NDI2MSIsInJvbGVzIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzM4NDUwNiwiaXNzIjoiQ2VtZW50RWd5cHRJc3N1ZXIiLCJhdWQiOiJDZW1lbnRFZ3lwdEFQSVVzZXIifQ.PlCmTYWj0H7hwJy8igitExwCJ3SjtwMx-Lxsqyhj6rQ";

//   const dummyNews = [
//     {
//       Title: "ارتفاع أسعار الأسمنت بنسبة 12% خلال الأسبوع الجاري",
//       Description: "شهدت سوق مواد البناء زيادة ملحوظة في أسعار الأسمنت المحلي.",
//       Content:
//         "أعلنت شركات الأسمنت عن زيادة جديدة في الأسعار بنسبة 12% نتيجة لارتفاع تكلفة النقل والطاقة. وأكد التجار أن الزيادة جاءت تدريجياً على مدار الأسبوع الحالي.",
//       CategoryId: categories[0].id,
//     },
//     {
//       Title: "انخفاض الطلب على الأسمنت في الأسواق المصرية",
//       Description: "تراجع الطلب المحلي بنسبة 8% وفقاً لتقارير غرفة مواد البناء.",
//       Content:
//         "أرجعت التقارير السبب إلى تراجع حركة البناء الخاصة والمشروعات السكنية الصغيرة، بينما يستمر الطلب الحكومي على حاله.",
//       CategoryId: categories[0].id,
//     },
//     {
//       Title: "تحسن صادرات الأسمنت المصري إلى أفريقيا",
//       Description: "نمو الصادرات بنسبة 20% في الربع الأخير من العام.",
//       Content:
//         "أكدت وزارة التجارة والصناعة أن صادرات الأسمنت إلى الأسواق الأفريقية شهدت ارتفاعاً كبيراً، خاصة في دول شرق أفريقيا مثل كينيا وتنزانيا.",
//       CategoryId: categories[2].id,
//     },
//     {
//       Title: "أكبر مصنع للأسمنت في أوروبا يعلن عن خفض انبعاثاته الكربونية",
//       Description: "في إطار التحول إلى صناعة صديقة للبيئة.",
//       Content:
//         "أعلنت شركة ألمانية كبرى عن خطط لاستخدام وقود بديل لتقليل الانبعاثات بنسبة 40% بحلول عام 2026، وهو ما يعد خطوة مهمة نحو الاستدامة البيئية.",
//       CategoryId: categories[2].id,
//     },
//     {
//       Title: "انطلاق مؤتمر تطوير صناعة الأسمنت في الشرق الأوسط",
//       Description: "مشاركة أكثر من 40 شركة دولية في المؤتمر المنعقد بدبي.",
//       Content:
//         "يهدف المؤتمر إلى مناقشة مستقبل الطاقة البديلة والرقمنة في صناعة الأسمنت، بمشاركة خبراء من أوروبا وآسيا وأفريقيا.",
//       CategoryId: categories[2].id,
//     },
//     {
//       Title: "الحكومة تعلن عن خطة جديدة لتطوير البنية التحتية",
//       Description: "زيادة موازنة الطرق والكباري بنسبة 25% في العام المقبل.",
//       Content:
//         "تسعى الحكومة إلى تحسين شبكة النقل بين المحافظات ودعم مشاريع الإسكان الجديدة، وهو ما سينعكس على زيادة الطلب على الأسمنت والحديد.",
//       CategoryId: categories[1].id,
//     },
//     {
//       Title: "موجة حر تضرب البلاد ودرجات الحرارة تتجاوز 42 درجة",
//       Description: "خبراء الأرصاد يحذرون من التعرض المباشر لأشعة الشمس.",
//       Content: "تستمر الموجة لمدة 5 أيام متواصلة، مع ارتفاع ملحوظ في نسب الرطوبة، وتوصيات بشرب كميات كافية من المياه.",
//       CategoryId: categories[1].id,
//     },
//     {
//       Title: "انخفاض سعر الدولار ينعش السوق المحلي",
//       Description: "تحسن طفيف في أسعار السلع المستوردة بعد تراجع الدولار.",
//       Content:
//         "أكدت مصادر مصرفية أن سعر الصرف شهد استقراراً تدريجياً خلال الأيام الماضية، مما ساهم في تراجع طفيف بأسعار مواد البناء المستوردة.",
//       CategoryId: categories[1].id,
//     },
//     {
//       Title: "افتتاح مصنع أسمنت جديد بطاقة إنتاجية 2 مليون طن سنوياً",
//       Description: "المصنع يقع في محافظة بني سويف وبدأ التشغيل التجريبي.",
//       Content:
//         "يعد هذا المشروع من أكبر الاستثمارات في قطاع الأسمنت خلال السنوات الأخيرة، وسيوفر أكثر من 500 فرصة عمل مباشرة.",
//       CategoryId: categories[0].id,
//     },
//     {
//       Title: "الأسمنت الأخضر.. مستقبل البناء المستدام",
//       Description: "تقنية جديدة لتقليل الانبعاثات وتحسين جودة البناء.",
//       Content:
//         "تعمل شركات عالمية على تطوير أسمنت منخفض الكربون، ما يساهم في خفض البصمة البيئية وتحقيق أهداف التنمية المستدامة.",
//       CategoryId: categories[2].id,
//     },
//   ];

//   const uploadNews = async () => {
//     setLoading(true);
//     try {
//       for (const news of dummyNews) {
//         const formData = new FormData();
//         Object.entries(news).forEach(([key, value]) => {
//           formData.append(key, value);
//         });

//         const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/News/CreateNews", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         });

//         if (!res.ok) throw new Error("Failed to upload news");
//         toast.success(`✅ ${news.Title} تم رفعه بنجاح`);
//       }
//       toast.success("🎉 تم رفع جميع الأخبار التجريبية بنجاح!");
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ حدث خطأ أثناء رفع الأخبار!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <ToastContainer position="top-center" />
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">رفع أخبار تجريبية واقعية</h1>
//       <button
//         onClick={uploadNews}
//         disabled={loading}
//         className={`px-6 py-3 rounded-lg text-white font-semibold ${
//           loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition-all"
//         }`}
//       >
//         {loading ? "جارٍ رفع الأخبار..." : "رفع 10 أخبار واقعية"}
//       </button>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProducerForm() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "21695a6d-d15e-4b89-6afa-08de148c2ffb", name: "جبس" },
    { id: "cda167cb-ac93-4a60-6afb-08de148c2ffb", name: "حديد" },
    { id: "072a4538-7b0e-4f16-6afc-08de148c2ffb", name: "أسمنت" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !categoryId || !image) {
      toast.error("من فضلك أكمل جميع الحقول");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("CategoryId", categoryId);
    formData.append("Image", image);

    setLoading(true);
    try {
      const res = await fetch("https://cement.northeurope.cloudapp.azure.com:5000/api/Producer/CreateProducer", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDZW1lbnRFZ3lwdCIsImp0aSI6Ijg4NjgyMThiLWNmYzktNGQyYi04N2UwLWFmYWNhMzM0N2FmNiIsImVtYWlsIjoiQ2VtZW50RWd5cHRAY2VtZW50RWd5cHQuY29tIiwidXNlclR5cGUiOiJTdXBlckFkbWluIiwidXVpZCI6IjA0MGU0OTUwLWRiNzgtNDQ5OC1hZWMyLWQ2ZTA4OWU4NDI2MSIsInJvbGVzIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzM4NDUwNiwiaXNzIjoiQ2VtZW50RWd5cHRJc3N1ZXIiLCJhdWQiOiJDZW1lbnRFZ3lwdEFQSVVzZXIifQ.PlCmTYWj0H7hwJy8igitExwCJ3SjtwMx-Lxsqyhj6rQ",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("فشل في رفع المنتج");
      toast.success("✅ تم رفع المنتج بنجاح!");
      setName("");
      setCategoryId("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء رفع المنتج");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="max-w-xl mx-auto bg-white shadow p-8 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-lg mb-2 font-medium">اسم المنتج</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#618FB5]"
            placeholder="اكتب اسم المنتج هنا"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-2 font-medium">الفئة</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-[#618FB5]"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">اختر الفئة</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg mb-2 font-medium">صورة المنتج</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          {image && <p className="text-sm text-gray-600 mt-2">📁 {image.name}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#618FB5] text-white py-3 rounded-xl hover:bg-[#4d7b9f] transition-all mt-4"
        >
          {loading ? "جاري الرفع..." : "رفع المنتج"}
        </button>
      </form>
    </div>
  );
}
