"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faSpinner,
  faEdit,
  faSave,
  faTimes,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { profileFormValues, profileSchema } from "../schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserProfile, updateUserProfile } from "../server/profile.actions";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "@/src/store/store";
import ChangePasswordForm from "../components/changePasswordForm";
import { setAuthInfo } from "../../auth/store/auth.slice";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [originalValues, setOriginalValues] = useState<profileFormValues>({
    name: "",
    email: "",
    phone: "",
  });
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<profileFormValues>({
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
    },
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // Watch form values to display current data
  const formValues = watch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Current userInfo from Redux:", userInfo);

        // Try to fetch full profile from API
        const response = await getUserProfile();
        console.log("Fetch profile response:", response);

        if (response.success && response.data) {
          console.log("Setting form values from API:", response.data);
          const profileData = {
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
          };
          setOriginalValues(profileData);
          reset(profileData, { keepDefaultValues: false });
        } else {
          // Use Redux data as fallback
          if (userInfo) {
            console.log("Setting form values from Redux:", userInfo);
            const profileData = {
              name: userInfo.name || "",
              email: userInfo.email || "",
              phone: userInfo.phone || "",
            };
            setOriginalValues(profileData);
            reset(profileData, { keepDefaultValues: false });
          }
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
        // Use Redux data on error
        if (userInfo) {
          const profileData = {
            name: userInfo.name || "",
            email: userInfo.email || "",
            phone: userInfo.phone || "",
          };
          setOriginalValues(profileData);
          reset(profileData, { keepDefaultValues: false });
        }
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [reset, userInfo]);

  const onSubmit: SubmitHandler<profileFormValues> = async (values) => {
    try {
      console.log("Submitting profile update with values:", values);
      const response = await updateUserProfile(values);
      console.log("Update profile response:", response);
      console.log("Response errors:", JSON.stringify(response.errors, null, 2));

      if (response.success) {
        toast.success(response.message || "Profile updated successfully");
        setIsEditing(false);

        // Update original values with new data
        setOriginalValues(values);

        // Update Redux store with new user info
        if (response.data?.user) {
          dispatch(
            setAuthInfo({
              isAuthenticated: true,
              userInfo: {
                name: response.data.user.name,
                email: response.data.user.email,
                phone: response.data.user.phone,
                id: userInfo?.id,
                role: userInfo?.role || "user",
              },
            }),
          );
        }
      } else {
        console.error("Profile update failed:", response);
        console.error("Full error details:", response.errors);

        if (response?.errors && typeof response.errors === "object") {
          Object.keys(response.errors).forEach((key) => {
            const errorMessage = response.errors?.[key];
            if (errorMessage) {
              console.log(`Setting field error - ${key}: ${errorMessage}`);
              setError(key as keyof profileFormValues, {
                message: errorMessage,
              });
            }
          });
        }

        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form to original values
    reset(originalValues);
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl text-green-600 animate-spin mb-4"
          />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  console.log("Rendering profile with form values:", formValues);
  console.log("Original values:", originalValues);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-4xl text-green-600"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {userInfo?.name || "User Profile"}
                </h1>
                <p className="text-green-100 text-sm mt-1">
                  Manage your account information
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-green-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-green-600" />
            Personal Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faUser} className="text-sm" />
                </span>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  *{errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  *{errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faPhone} className="text-sm" />
                </span>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  *{errors.phone.message}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Egyptian phone numbers only (e.g., 01012345678)
              </p>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin"
                      />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faTimes} />
                  Cancel
                </button>
              </div>
            )}
          </form>

          {/* Account Status Info */}
          {!isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-600"
                  />
                  <span>Account Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="text-green-600" />
                  <span>Role: {userInfo?.role || "User"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <ChangePasswordForm />
      </div>
    </div>
  );
}
