import React, { useEffect} from 'react';
import { observer } from 'mobx-react';
import { Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useStores } from '../../stores';
import ProfileForm from './ProfileForm';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 128,
  height: 128,
  fontSize: 48,
}));

const Profile = observer(() => {
  const { profileStore } = useStores();

  useEffect(() => {
    profileStore.fetchProfile();
  }, [profileStore]);

  if (!profileStore.profile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <LargeAvatar
        src={profileStore.profile.avatar}
        alt={profileStore.profile.name}
      >
        {profileStore.profile.name.charAt(0)}
      </LargeAvatar>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {profileStore.profile.name}
      </Typography>
      <ProfileForm profile={profileStore.profile} />

    </ProfileContainer>
  );
});

export default Profile;
