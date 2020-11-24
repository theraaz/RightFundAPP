export const isCharityProfileInComplete = myCharityProfile => {
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
      !myCharityProfile?.trustees &&
      myCharityProfile.position === 'trustee'
    ) {
      bool = true;
    } else if (
      myCharityProfile.trustees &&
      myCharityProfile.position === 'trustee' &&
      myCharityProfile.trustees.length === 0
    ) {
      bool = true;
    } else if (
      myCharityProfile.trustees &&
      myCharityProfile.position === 'trustee' &&
      myCharityProfile.trustees.length > 0
    ) {
      bool = true;
      for (const trustee of myCharityProfile.trustees) {
        if (
          trustee.firstName?.trim() !== '' &&
          trustee.lastName?.trim() !== '' &&
          trustee.email?.trim() !== '' &&
          trustee.phoneNumber?.trim() !== ''
        ) {
          bool = false;
        }
      }
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
export function RemoveHTMLTags(html, limit) {
  let regX = /(<([^>]+)>)/gi;
  let converted = html?.replace(regX, '');
  return limit && converted?.length > limit
    ? converted?.substring(0, limit)
    : converted;
}
export const getBadgeColorTableStatus = id => {
  switch (id) {
    case 1:
      return '#34c31a';
    case 2:
      return 'grey';
    case 4:
      return '#f1cc1c';
    case 9:
      return '#e62424';
    default:
      return '';
  }
};
