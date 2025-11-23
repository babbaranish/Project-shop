import React, { useState } from 'react';
import { connect } from 'react-redux';

import { firestore } from '../../firebase/firebase.utils';

import {
  ProfileContainer,
  ProfileTitle,
  ProfileCard,
  ProfileSection,
  Label,
  Value,
  EditButton,
  EditForm,
  Input,
  SaveButton,
  CancelButton,
  ButtonGroup
} from './profile.styles';

const ProfilePage = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      try {
        const userRef = firestore.doc(`users/${currentUser.id}`);
        await userRef.update({
          displayName: formData.displayName
        });
        alert('Profile updated successfully!');
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || ''
    });
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <ProfileContainer>
        <ProfileTitle>Profile</ProfileTitle>
        <ProfileCard>
          <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            Please sign in to view your profile.
          </p>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileTitle>My Profile</ProfileTitle>
      <ProfileCard>
        {!isEditing ? (
          <>
            <ProfileSection>
              <Label>Display Name</Label>
              <Value>{currentUser.displayName}</Value>
            </ProfileSection>
            <ProfileSection>
              <Label>Email</Label>
              <Value>{currentUser.email}</Value>
            </ProfileSection>
            <ProfileSection>
              <Label>Member Since</Label>
              <Value>
                {currentUser.createdAt
                  ? new Date(currentUser.createdAt.toDate()).toLocaleDateString()
                  : 'N/A'}
              </Value>
            </ProfileSection>
            <EditButton onClick={() => setIsEditing(true)}>
              Edit Profile
            </EditButton>
          </>
        ) : (
          <EditForm onSubmit={handleSubmit}>
            <ProfileSection>
              <Label>Display Name</Label>
              <Input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
              />
            </ProfileSection>
            <ProfileSection>
              <Label>Email</Label>
              <Value>{currentUser.email}</Value>
              <small style={{ color: '#999', fontSize: '12px' }}>
                Email cannot be changed
              </small>
            </ProfileSection>
            <ButtonGroup>
              <SaveButton type="submit">Save Changes</SaveButton>
              <CancelButton type="button" onClick={handleCancel}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </EditForm>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProfilePage);
