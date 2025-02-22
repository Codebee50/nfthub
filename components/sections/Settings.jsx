import React, { useState } from "react";
import SectionHeaderText from "../SectionHeaderText";
import artCover from "@/public/categories/art-cover.jpg";
import hockeyanimal from "@/public/hockeyanimal.jpg";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../FormInput";
import LongLoadableButton from "../LongLoadableButton";
import FloatingInput from "../FloatingInput";
import usePatchRequest from "@/hooks/usePatch";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import { handleGenericError } from "@/utils/errorHandler";
import usePostRequest from "@/hooks/usePost";
import ImagePreviewSelector from "../ImagePreviewSelector";
import { setUserImages } from "@/features/auth/authSlice";

const Settings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  const patchRequest = usePatchRequest();
  const postRequest = usePostRequest();

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = patchRequest(
    makeApiUrl("/api/v1/auth/user/update/"),
    (response) => {
      dispatch(
        setUserImages({
          cover_image: response.data.cover_image,
          profile_photo: response.data.profile_photo,
        })
      );
      toast.success("Profile updated successfully");
    },
    (error) => {
      toast.error(handleGenericError(error));
    },
    "multipart/form-data"
  );

  const { mutate: changePassword, isLoading: isChangingPassword } = postRequest(
    makeApiUrl("/api/v1/auth/user/password/change/"),
    (response) => {
      toast.success("Password updated successfully");
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

  const handleChangePasswordFormSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const oldPassword = formData.get("old_password");
    const newPassword = formData.get("new_password");
    const confirmPassword = formData.get("confirm_password");
    if (confirmPassword !== newPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const reqBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    changePassword(reqBody);
  };

  const handleUpdateFormSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const reqBody = {
      bio: formData.get("bio"),
    };

    if (coverImage) {
      reqBody.cover_image = coverImage;
    }

    if (profileImage) {
      reqBody.profile_photo = profileImage;
    }

    console.log(reqBody);
    updateProfile(reqBody);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="w-full">
        <SectionHeaderText label={"Update profile"} />

        <div className="mt-2 w-full flex items-center flex-col">
          <ImagePreviewSelector
            initialSrc={userInfo?.cover_image}
            className="h-[150px] w-full object-cover object-center rounded-md"
            onFileChanged={setCoverImage}
          />

          <ImagePreviewSelector
            onFileChanged={setProfileImage}
            initialSrc={userInfo?.profile_photo}
            className="w-[70px] h-[70px] rounded-full -mt-6 border-[3px] border-white object-cover object-center"
          />
        </div>

        <form
          action=""
          className="flex flex-col"
          onSubmit={handleUpdateFormSubmitted}
        >
          <FormInput
            className="bg-grey01"
            initial={`@${userInfo?.username}`}
            readOnly={true}
            label="Username"
            required={false}
          />
          <FormInput
            className="bg-grey01"
            initial={`@${userInfo?.email}`}
            readOnly={true}
            label="Email"
            required={false}
          />
          <FormInput
            type="textarea"
            initial={`${userInfo?.bio || ""}`}
            label="Bio"
            required={false}
            name={"bio"}
          />

          <LongLoadableButton
            label={"Update profile"}
            full={false}
            isLoading={isUpdatingProfile}
          />
        </form>
      </div>
      <div className="w-full">
        <SectionHeaderText label={"Change password"} />

        <form
          action=""
          className="mt-2 flex flex-col gap-5"
          onSubmit={handleChangePasswordFormSubmitted}
        >
          <FloatingInput text="Old password:" type="text" name="old_password" />
          <FloatingInput text="New password:" type="text" name="new_password" />
          <FloatingInput
            text="Confirm new password:"
            type="text"
            name="confirm_password"
          />
          <LongLoadableButton
            label={"Change password"}
            full={false}
            isLoading={isChangingPassword}
          />
        </form>
      </div>
    </div>
  );
};

export default Settings;
