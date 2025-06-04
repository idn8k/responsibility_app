'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import Link from 'next/link';

import Button from './ui/Button';

const StyledHeading = styled.h2`
  color: var(--primary-color);
  font-size: 32px;
`;

const StyledForm = styled.form`
  height: 100%;
  width: 80%;
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const StyledInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  color: var(--primary-color);
  font-size: 20px;
  margin-left: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  border-style: inset;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(255, 53, 104, 0.973);
  }

  &::placeholder {
    color: grey;
  }
`;

const StyledDateInput = styled.input.attrs({ type: 'date' })`
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  font-size: 16px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(255, 53, 104, 0.973);
  }

  &::placeholder {
    color: grey;
    font-style: italic;
  }
  &::-webkit-datetime-isedit {
    color: grey;
    font-family: system-ui;
  }
`;

const StyledBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const StyledLinkBtn = styled(Link)`
  background-color: #fff;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  width: 45%;
  padding: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  text-align: center;

  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover,
  &:active {
    background-color: var(--primary-color);
    color: white;
  }
`;

const StyledSpan = styled.span`
  color: var(--primary-color);
  position: absolute;
  left: 10px;
  bottom: 80px;
`;

export default function ChildForm({ child, isEdit, onEdit }) {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: child?.name || '',
    birth_date: child?.birth_date ? new Date(child.birth_date).toISOString().split('T')[0] : '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFormComplete, setFormComplete] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const requiredFieldsFilled = inputData.name.length !== 0 && inputData.birth_date.length !== 0;
    if (isEdit) {
      setFormComplete(requiredFieldsFilled);
    } else {
      setFormComplete(requiredFieldsFilled && selectedFile !== null);
    }
  }, [inputData, selectedFile, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setError('');
    setUploadStatus('');

    // Client-side validation for required fields
    if (!inputData.name || !inputData.birth_date) {
      setError('Please fill in all required information.');
      setIsSubmitting(false);
      return;
    }

    let childId = child?._id; // Use existing child ID for edits

    // --- Step 1: Create/Update Child Data (Initial Save) ---

    const childCoreData = {
      name: inputData.name,
      birth_date: inputData.birth_date,
    };

    try {
      const apiEndpoint = isEdit ? `/api/child_items/${child._id}` : '/api/child_items';
      const method = isEdit ? 'PUT' : 'POST';

      const childDataResponse = await fetch(apiEndpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(childCoreData),
      });

      const childDataResponseBody = await childDataResponse.json();

      if (!childDataResponse.ok) {
        const apiErrorMsg = childDataResponseBody.error || 'Unknown API error';
        console.error('Initial child save failed:', apiErrorMsg);
        setError(`Failed to save child data: ${apiErrorMsg}`);
        setIsSubmitting(false);
        return;
      }

      // If adding a new child, get the newly created ID
      if (!isEdit) {
        if (childDataResponseBody.child && childDataResponseBody.child._id) {
          childId = childDataResponseBody.child._id;
        } else {
          console.error('Unexpected response after child creation: Missing child ID');
          setError('Failed to get child ID after creation.');
          setIsSubmitting(false);
          return;
        }
      } else {
        if (selectedFile && child?.publicId) {
          console.log('Deleting old image with publicId:', child.publicId);
          try {
            const deleteResponse = await fetch('/api/images/delete-image', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ publicId: child.publicId }),
            });
            if (!deleteResponse.ok) {
              console.error('Failed to delete old image:', await deleteResponse.text());
            } else {
              console.log('Old image deleted successfully.');
            }
          } catch (deleteError) {
            console.error('Error during old image deletion fetch:', deleteError);
          }
        }
      }

      // --- Step 2: Upload Image (if a file is selected) ---
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);
        imageFormData.append('childId', childId);

        try {
          setUploadStatus('Uploading image...');
          const imageUploadResponse = await fetch('/api/images/upload-image', {
            method: 'POST',
            body: imageFormData,
          });

          const imageUploadResponseBody = await imageUploadResponse.json();

          if (!imageUploadResponse.ok) {
            const uploadErrorMsg = imageUploadResponseBody.error || 'Unknown image upload error';
            console.error('Image upload failed:', uploadErrorMsg);
            setUploadStatus(`Image upload failed: ${uploadErrorMsg}`);

            setError('Image upload failed. Please try again.');

            setIsSubmitting(false);
            return;
          }

          console.log('Image uploaded and child document updated.');
          setUploadStatus('Image upload successful!');
          setSelectedFile(null);
        } catch (uploadError) {
          console.error('Error during image upload fetch:', uploadError);
          setUploadStatus('An error occurred during image upload.');
          setError('An error occurred during image upload.');
          setIsSubmitting(false);
          return;
        }
      } else {
        setUploadStatus('Child data saved.');
      }

      // --- Final Step: Redirect ---

      console.log('Process complete, redirecting.');
      router.push('/');
    } catch (error) {
      console.error('An unexpected error occurred during form submission:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setInputData((prevInputData) => ({ ...prevInputData, [key]: value }));
  }

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
    setUploadStatus('');
  }

  const shortUrl = isEdit && child.imgUrl.slice(0, 20) + '...';

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeading>{isEdit ? 'Edit Child' : 'Add Child'}</StyledHeading>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {uploadStatus && <p style={{ color: 'blue' }}>{uploadStatus}</p>}
        <StyledInputContainer>
          <StyledLabel htmlFor="name">Child Name*</StyledLabel>
          <StyledInput
            name="name"
            required={!isEdit}
            type="text"
            id="name"
            onChange={handleChange}
            value={inputData.name}
            placeholder={isEdit ? child.name : '...'}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="birth_date">Date of Birth*</StyledLabel>
          <StyledDateInput
            name="birth_date"
            required={!isEdit}
            type="date"
            id="birth_date"
            onChange={handleChange}
            value={inputData.birth_date}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="imgUrl">Image*</StyledLabel>
          <StyledInput type="file" accept="image/*" onChange={handleFileChange} />
          {isEdit && child?.imgUrl && !selectedFile && (
            <p>
              Current image: <a href={child.imgUrl} target="_blank" rel="noopener noreferrer" />
              {shortUrl}
            </p>
          )}
        </StyledInputContainer>
        <StyledBtnContainer>
          <StyledLinkBtn href="/">Cancel</StyledLinkBtn>
          {isFormComplete && !error && (
            <Button isDisabled={isSubmitting || !isFormComplete} type="submit">
              {isSubmitting
                ? isEdit
                  ? 'Saving...'
                  : 'Adding...'
                : isEdit
                  ? 'Save Changes'
                  : 'Add Child'}
            </Button>
          )}
          <StyledSpan>*Required</StyledSpan>
        </StyledBtnContainer>
      </StyledForm>
    </>
  );
}
