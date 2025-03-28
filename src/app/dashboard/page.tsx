"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
  name: string;
  description: string;
  price: number;
  image: FileList;
}

export default function page() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [uploading, setUploading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setUploading(true);

    try {
      let imageUrl: string | null = null;

      // Handle Image Upload
      if (data.image.length > 0) {
        const file = data.image[0];
        const filePath = `products/${Date.now()}-${file.name}`;
        const { data: imageData, error: imageError } = await supabase.storage
          .from("product-images")
          .upload(filePath, file);

        if (imageError) throw imageError;

        imageUrl = supabase.storage.from("product-images").getPublicUrl(filePath).data.publicUrl;
      }

      // Insert Product Data
      const { error } = await supabase.from("products").insert([
        {
          name: data.name,
          description: data.description,
          price: data.price,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      alert("Product uploaded successfully!");
      reset();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border mt-36 rounded">
      <input type="text" placeholder="Product Name" {...register("name", { required: true })} className="border p-2 w-full" />
      <textarea placeholder="Description" {...register("description", { required: true })} className="border p-2 w-full" />
      <input type="number" placeholder="Price" {...register("price", { required: true, valueAsNumber: true })} className="border p-2 w-full" />
      <input type="file" accept="image/*" {...register("image")} className="border p-2 w-full" />
      <button type="submit" disabled={uploading} className="bg-blue-500 text-white px-4 py-2">
        {uploading ? "Uploading..." : "Upload Product"}
      </button>
    </form>
  );
}
