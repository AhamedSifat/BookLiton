import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotel-options-config"
import type { HotelFormData } from "./ManageHotelForm"
import { Settings } from "lucide-react"

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <Settings className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Facilities</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex items-center space-x-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
          >
            <input
              type="checkbox"
              value={facility}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true
                  } else {
                    return "At least one facility is required"
                  }
                },
              })}
            />
            <span className="font-medium">{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold mt-2 block">{errors.facilities.message}</span>
      )}
    </div>
  )
}

export default FacilitiesSection
