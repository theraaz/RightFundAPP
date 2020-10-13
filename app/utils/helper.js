export const isCharityProfileCompleted = myCharityProfile => {
  let bool = false;
  if (myCharityProfile) {
    if (!myCharityProfile?.name) {
      bool = true;
    } else if (myCharityProfile?.name?.trim() === '') {
      bool = true;
    }
    if (!myCharityProfile?.regNo) {
      bool = true;
    }
    if (!myCharityProfile?.position) {
      bool = true;
    }
    if (!myCharityProfile?.charityWeb) {
      bool = true;
    } else if (myCharityProfile?.charityWeb?.trim() === '') {
      bool = true;
    }
    if (!myCharityProfile?.userDetails) {
      bool = true;
    } else if (
      myCharityProfile.userDetails &&
      Object.values(JSON.parse(myCharityProfile.userDetails)).filter(
        d => d !== null,
      ).length !== 4
    ) {
      bool = true;
    }
    if (
      !myCharityProfile?.trusteeDetails &&
      myCharityProfile.position === 'trustee'
    ) {
      bool = true;
    } else if (
      myCharityProfile.trusteeDetails &&
      myCharityProfile.position === 'trustee' &&
      Object.values(JSON.parse(myCharityProfile.trusteeDetails)).filter(
        d => d !== null,
      ).length !== 4
    ) {
      bool = true;
    }
    if (!myCharityProfile.userPhotoId) {
      bool = true;
    } else if (myCharityProfile.userPhotoId === '') {
      bool = true;
    }
    if (!myCharityProfile.constitutionDoc) {
      bool = true;
    } else if (myCharityProfile.constitutionDoc === '') {
      bool = true;
    }
  }

  return bool;
};
