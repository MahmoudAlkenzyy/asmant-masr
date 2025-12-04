import Image from "next/image";
import React from "react";

export const Intro = () => {
  return (
    <>
      {/* Credibility Section */}
      <section dir="rtl" className="py-20 bg-white md:flex containerr">
        <div className="containerr md:w-1/2 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 ">المصداقية</h2>
          <p className="text-[#292E2B] opacity-50 text-xl max-w-xl md:text-xl leading-relaxed  font-normal">
            نشتشرف باننا الموقع الوحيد داخل جمهورية مصر العربية الحاصل علي الموافقة الرسمية من الجهات المسئولة لجمع ونشر
            أسعار مواد البناء وذلك وفقا للتصريح رقم ........... لعام .....
          </p>
          <p className="text-[#292E2B] opacity-50 text-xl max-w-xl md:text-xl leading-relaxed mt-6 font-normal">
            ونحن نلتزم بتقديم هذه البيانات المصرح لنا بجمعها للمستهلك ولشركاء الصناعة بشكل دوري علي موقعنا مما يساهم في
            تطور صناعة الاسمنت ومواد البناء في مصر توافقا مع سياسات الدولة الرامية الي تطوير مناحي الصناعات المختلفة في
            مصر
          </p>
          <h2 className="text-4xl md:text-2xl font-semibold mb-10  mt-10">اخلاء المسئولية</h2>
          <p className="text-[#292E2B] opacity-50 text-2xl md:text-xl max-w-xl leading-relaxed  mb-12">
            وحيث اننا نمتلك تصريحا رسميا بجمع البيانات الخاصة بتغير أسعار مواد البناء في مصر وانطلاقا من سياستنا القائمة
            علي تقديم خدمة مميزة لكلا من المستخدمين والعملاء فإننا نهيب بالجميع ملاحظة ما يلي :
          </p>
        </div>{" "}
        <div className="md:w-1/2  ">
          <img src="/images/Community/Ellipse.png" className="mx-auto" alt="" />
        </div>
      </section>

      {/* Disclaimer Section */}
      <section dir="rtl" className="py-20 bg-[#F8F9FA]">
        <div className="containerr mx-auto">
          <div className="space-y-8 flex flex-wrap">
            {/* First Point */}
            <div className="md:w-1/2  p-2 rounded-lg ">
              <h3 className="text-2xl md:text-2xl font-semibold  mb-4 text-primary">أولا :</h3>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed">
                تراعي إدارة الموقع التأكد من صحة ودقة البيانات والمعلومات المتاحة من المصادر الموثوق منها وبالتالي فان
                كافة المعولمات والبيانات المنشورة علي الموقع صحيحة من وجهة نظر الموقع والقائمين عليه مؤكدين التزامنا
                بالتنويه المباشر عنذ تغيير تلك البيانات ا او الملعومات لتسهيل وصول المعلومات الجديدة للمستخدم والعملاء
                في اسرع وقت ممكن
              </p>
            </div>

            {/* Second Point */}
            <div className="md:w-1/2  p-2 rounded-lg ">
              <h3 className="text-2xl md:text-2xl font-semibold  mb-4 text-primary">ثانيا :</h3>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed">
                حدوث أي خطأ في البيانات المنشورة علي الموقع ( ان حدث ) فهو نتيجة السهو وليس لإدارة الموقع أي مصلحة في
                نشر معلومات او بيانات غير صحيحة او غير دقيقة . وبالتالي فان حدوث أي خطأ في هذه البيانات المنسوبة الي
                مصرد ما فإن مسئولية هذه البيانات تقع مباشرة علي المصدر وحده والموقع غير مسئول عن أي خطأ يرد في البيانات
                المنشورة علي الموقع والمنسوبة لمصدر ما بعينه
              </p>
            </div>

            {/* Third Point */}
            <div className="md:w-1/2  p-2 rounded-lg ">
              <h3 className="text-2xl md:text-2xl font-semibold  mb-4 text-primary">ثالثا :</h3>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed">
                ان ما يقوم بنشره الموقع من بيانات ومعلومات لا يعد توصية من الموقع لاي جهة كانت او أي شخص كان باتخاذ أي
                قرارر تجاري او استثماري معين خاص به .. والموقع غير مسئول اطلاقا عن أي تبعات قانونية او قرارات استثمارية
                او خسائر نتجت عن اتخاذ المستخدم للموقع هذه البيانات او المعلومات علي انه توصية من اجل اتخاذ قرار تجاري
                او استثماري أيا كان نوعه
              </p>
            </div>

            {/* Fourth Point */}
            <div className="md:w-1/2  p-2 rounded-lg ">
              <h3 className="text-2xl md:text-2xl font-semibold  mb-4 text-primary">رابعا :</h3>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed">
                وبناء عليه فان المستخدم يتحمل المسئولية كاملة عن قراراته او تحركاته التي نتجت عن تقييمه الشخصي لهذه
                البيانات والمعلومات والمواد المنشورة علي الموقع دون ادني مسئولية أدبية او قانونية علي الموقع وبالتالي
                فان إدارة الموقع تنصح المستخدم الكريم في تحري الدقة واستشارة أصحاب الرأي الفني المناسب قبل اتخاذ أي قرار
                او اجراء يتعلق بايا من المعلومات او البيانات المنشورة علي الموقع
              </p>
            </div>

            {/* Fifth Point */}
            <div className="md:w-1/2 md:mx-auto  p-2 rounded-lg ">
              <h3 className="text-2xl md:text-2xl font-semibold  mb-4 text-primary">خامسا :</h3>
              <p className="text-[#292E2B] opacity-50 text-lg md:text-xl leading-relaxed">
                الموقع والشركة المالكة له او المملوكة له او الشركات الشقيقة او ادارته او موظفيه او وكلاءه او الموزعين او
                الأطراف الثالثة التي تزوده بالمعولمات او تسمح له باستخدام وإعادة نشر هذه المعلومات او تقديم محتوي مبني
                علي هذه المعلومات لن يكونوا مسئولين باي شكل من الاشكال عن كيفية استخدام واستعمال هذا المحتوي وهذه
                المعلومات من قبل المستخدم الذي يتحمل المسئولية كاملة عن طريقة استخدامه لهذه البيانات دون أي مسئولية عن
                الأطراف السابق ذكرها عن هذا الاستخدام من قبل المستخدم
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
