import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "./ManageHotelForm"
import { Building, MapPin, Globe, FileText, DollarSign, Star } from "lucide-react"

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
          <Building className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add Hotel</h1>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Building className="h-4 w-4 text-gray-500" />
          <span>Name</span>
        </div>
        <input
          type="text"
          className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            errors.name
              ? "border-red-300 bg-red-50 focus:border-red-500"
              : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
          }`}
          placeholder="Enter hotel name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>City</span>
          </div>
          <input
            type="text"
            className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.city
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
            }`}
            placeholder="Enter city"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && <span className="text-red-500 text-sm mt-1 block">{errors.city.message}</span>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span>Country</span>
          </div>
          <input
            type="text"
            className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.country
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
            }`}
            placeholder="Enter country"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && <span className="text-red-500 text-sm mt-1 block">{errors.country.message}</span>}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span>Description</span>
        </div>
        <textarea
          rows={10}
          className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none ${
            errors.description
              ? "border-red-300 bg-red-50 focus:border-red-500"
              : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
          }`}
          placeholder="Describe your hotel..."
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && <span className="text-red-500 text-sm mt-1 block">{errors.description.message}</span>}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>Price Per Night</span>
          </div>
          <input
            type="number"
            min={1}
            className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.pricePerNight
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
            }`}
            placeholder="Enter price"
            {...register("pricePerNight", { required: "This field is required" })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-sm mt-1 block">{errors.pricePerNight.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-gray-500" />
            <span>Star Rating</span>
          </div>
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.starRating
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
            }`}
          >
            <option value="" className="text-sm font-bold">
              Select a Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          {errors.starRating && <span className="text-red-500 text-sm mt-1 block">{errors.starRating.message}</span>}
        </label>
      </div>
    </div>
  )
}

export default DetailsSection
