// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Pin } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useApi } from "@/hooks/use-api-data";

// export default function Categories() {
//   const router = useRouter();
//   const { data: categoryData, isLoading } = useApi("/category", ["categories"]);
//   const categories = categoryData?.data || [];

//   const getImageUrl = (path: string | undefined) => {
//     if (!path) return "/placeholder.png";
//     if (path.startsWith("http")) return path;
//     if (path.startsWith("/"))
//       return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${path}`;
//     return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/${path}`;
//   };

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24">
//         {/* Header */}
//         <div className="mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E32] flex items-center gap-2">
//             <span className="text-[#146041] text-xl uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
//               <Pin className="w-5 h-5" />
//               Servify
//             </span>
//           </h2>
//           {/* <h2 className="text-4xl md:text-5xl font-bold text-[#0D1E32]">
//             Categories
//           </h2> */}
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 justify-center">
//           {isLoading ? (
//             <div className="col-span-3 text-center py-10 text-gray-500">
//               Loading categories...
//             </div>
//           ) : (
//             categories.map((category: any) => (
//               <div
//                 key={category._id}
//                 onClick={() => {
//                   console.log("Category ID:", category._id);
//                   router.push(
//                     `/service?category=${encodeURIComponent(
//                       category.categoryName,
//                     )}`,
//                   );
//                 }}
//                 className="block cursor-pointer"
//               >
//                 <CategoryCard category={category} getImageUrl={getImageUrl} />
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function CategoryCard({
//   category,
//   getImageUrl,
// }: {
//   category: any;
//   getImageUrl: (path: string) => string;
// }) {
//   return (
//     <div className="group relative h-[180px] md:h-[300px] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
//         style={{ backgroundImage: `url('/category-bg.png')` }}
//       />

//       {/* Content */}
//       <div className="relative z-10 h-full border-2 border-[#E6F4F1] rounded-3xl flex flex-col items-center justify-center p-2 md:p-6">
//         <div className="relative w-24 h-24 md:w-48 md:h-48 mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-100">
//           <Image
//             src={getImageUrl(category.image)}
//             alt={category.categoryName}
//             fill
//             className="object-contain drop-shadow-lg"
//           />
//         </div>
//         <h3 className="text-xs md:text-xl font-bold text-[#0D1E32] mt-auto text-center">
//           {category.categoryName}
//         </h3>
//       </div>
//     </div>
//   );
// }
