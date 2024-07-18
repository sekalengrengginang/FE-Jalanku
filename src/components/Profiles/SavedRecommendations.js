"use client"
import { X } from "lucide-react";
import { useToast } from "@/components/shadcn/ui/use-toast";
import deleteRecommendations from "./delete-recommendations";
export default function SavedRecommendations({  recommendation}) {
  const { toast } = useToast();
  const rekomendasiData = recommendation.map((rekomendasi) => {
    const recommendationsArray = Object.values(
      JSON.parse(rekomendasi.recommendation_saved)
    );
    return {
      id: rekomendasi.id,
      recommendations: recommendationsArray.map((rekomendasi) => ({
        destinationName: rekomendasi.destination_name,
        category: rekomendasi.category,
        image: rekomendasi.image,
        price: rekomendasi.price,
        rating: rekomendasi.rating,
      })),
    };
  });

  async function deleteRecommendation(id){
    const result = await deleteRecommendations(id)
    if (result?.error) {
      toast({
        variant: "destructive",
        className: "bg-red-500 text-white",
        title: "Tidak bisa menghapus rekomendasi!",
      });
    }else{
      toast({
        className: "bg-[#2F3645] dark:bg-white  text-white dark:text-black",
        title: "Rekomendasi berhasil dihapus!",
      });
    }
  }


  return (
    <>
    <div className="mx-5 mb-5 h-full lg:w-[150vh] lg:h-[80vh] dark:bg-white rounded-xl ">
        <div
          className="overflow-y-auto mt-10 w-full h-full lg:h-[75vh] rounded-3xl [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-white
                [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-[#1EB47D]"
        >
          <div className="flex flex-wrap justify-center">
            {rekomendasiData?.map((rekomendasi, index) => (
              <div key={index}>
                <div className="flex justify-between text-white mx-5 p-5 bg-zinc-900 rounded-2xl ">
                  <div className="rounded-lg px-3 bg-white">
                    <h1 className="text-black text-center py-1">{index+1}</h1>
                  </div>
                      {" "}
                      <button
                        className="bg-white text-black rounded-full p-1 "
                        onClick={() => deleteRecommendation(rekomendasi.id)}
                      >
                        <X />
                      </button>
                </div>
                {rekomendasi?.recommendations.map(
                  (recommendation, recIndex) => (
                    <div className="flex justify-center m-5" key={recIndex}>
                      <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 lg:w-[40vh] h-[40vh] lg:h-[30vh] ">
                        <img
                          src={recommendation?.image}
                          alt="Gambar Rekomendasi"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                        <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                          {recommendation?.destinationName}
                        </h3>
                        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                          Kategori: {recommendation?.category}
                        </div>
                        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                          Rating: {recommendation?.rating}
                        </div>
                        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                          Tiket Masuk: Rp.{recommendation?.price}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
