"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  categorySlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    categorySlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--primary-cream)] pt-24 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "price" ? Number(e.target.value) : e.target.value,
    }));
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "additionalPrice"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    if (!file) {
      throw new Error("No file selected");
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary credentials not configured");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error?.message || "Image upload failed");
    }

    return resData.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      const url = await upload();
      const res = await fetch(`http://localhost:3000/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();
      toast.success("Product added successfully!");
      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--primary-cream)] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium mb-3">
            Admin Panel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-display text-[var(--primary-deep)]">
            Add New Product
          </h1>
          <div className="divider mx-auto mt-4"></div>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label
                className="flex items-center gap-3 cursor-pointer w-fit px-6 py-3 bg-[var(--primary-gold)]/10 hover:bg-[var(--primary-gold)]/20 rounded-lg transition-colors"
                htmlFor="file"
              >
                <svg
                  className="w-6 h-6 text-[var(--primary-gold)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-[var(--primary-deep)]">
                  {file ? file.name : "Upload Product Image"}
                </span>
              </label>
              <input
                type="file"
                onChange={handleChangeImg}
                id="file"
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-[var(--primary-deep)] mb-2">
                Product Title
              </label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g., Bella Napoli Pizza"
                name="title"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[var(--primary-deep)] mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="textarea-field"
                placeholder="Describe your delicious dish..."
                name="desc"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-[var(--primary-deep)] mb-2">
                  Base Price ($)
                </label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="29.99"
                  name="price"
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[var(--primary-deep)] mb-2">
                  Category
                </label>
                <select
                  className="input-field"
                  name="categorySlug"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="pizzas">Pizzas</option>
                  <option value="burgers">Burgers</option>
                  <option value="pastas">Pastas</option>
                </select>
              </div>
            </div>

            {/* Options Section */}
            <div className="border-t border-[var(--neutral-200)] pt-6">
              <h3 className="text-lg font-semibold text-[var(--primary-deep)] mb-4">
                Size Options (Optional)
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  className="input-field"
                  type="text"
                  placeholder="e.g., Small"
                  name="title"
                  value={option.title} // ← ADD THIS
                  onChange={changeOption}
                />
                <input
                  className="input-field"
                  type="number"
                  placeholder="Additional price"
                  name="additionalPrice"
                  value={option.additionalPrice} // ← ADD THIS
                  onChange={changeOption}
                  step="0.01"
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    if (option.title) {
                      setOptions((prev) => [...prev, option]);
                      setOption({ title: "", additionalPrice: 0 }); // ← This now works because inputs are controlled
                    }
                  }}
                >
                  Add Option
                </button>
              </div>

              {/* Options List */}
              {options.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {options.map((opt, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[var(--primary-gold)]/10 text-[var(--primary-deep)] rounded-lg cursor-pointer hover:bg-[var(--error)]/10 hover:text-[var(--error)] transition-colors"
                      onClick={() =>
                        setOptions((prev) =>
                          prev.filter((item) => item.title !== opt.title),
                        )
                      }
                    >
                      <span className="font-medium">{opt.title}</span>
                      <span className="text-sm ml-2">
                        (+${opt.additionalPrice.toFixed(2)})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner"></div>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Product
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
