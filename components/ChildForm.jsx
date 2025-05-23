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
    if (
      isEdit ||
      (inputData.name.length !== 0 && inputData.birth_date.length !== 0 && selectedFile)
    ) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [inputData, selectedFile, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setError('');
    setUploadStatus('');

    if (!inputData.name || !inputData.birth_date) {
      setError('Please fill in all required information.');
      setIsSubmitting(false);
      return;
    }
    let imgUrl = child?.imgUrl || '';

    if ((!isEdit && selectedFile) || (isEdit && selectedFile)) {
      if (!selectedFile) {
        setError('Please select an image file.');
        setIsSubmitting(false);
        return;
      }
    }

    const ImgFormData = new FormData(e.target);
    ImgFormData.append('image', selectedFile);

    try {
      setUploadStatus('Uploading image...');
      const imageUploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: ImgFormData,
      });

      const imageData = await imageUploadResponse.json();

      if (!imageUploadResponse.ok) {
        const uploadErrorMsg = imageData.error || 'Unknown image upload error.';
        console.error('Image upload failed:', uploadErrorMsg);
        setUploadStatus(`Image upload failed: ${uploadErrorMsg}`);
        setError('Image upload failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      imgUrl = imageData.imageUrl; // to get the image url from Cloudinary
      setUploadStatus('Image uploaded successfully!');
      setSelectedFile(null);
    } catch (uploadError) {
      console.error('Error during image upload fetch:', uploadError);
      setUploadStatus('An error occurred during image upload.');
      setError('An error occurred during image upload.');
      setIsSubmitting(false);
      return;
    }
    const childDataToSubmit = {
      name: inputData.name,
      birth_date: inputData.birth_date,
      imgUrl: imgUrl,
    };

    try {
      const apiEndpoint = isEdit ? `/api/child_items/${child._id}` : '/api/child_items';
      const method = isEdit ? 'PUT' : 'POST';
      const response = await fetch(apiEndpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(childDataToSubmit),
      });
      const responseData = await response.json();

      if (!response.ok) {
        const apiErrorMsg = responseData.error || 'Unknown API error';
        console.error('Child API data failed:', apiErrorMsg);
        setError('Failed to save child data:', apiErrorMsg);
      } else {
        //success!
        console.log('Child data saved successfully!:', responseData);
        router.push('/');
      }
    } catch (apiError) {
      console.error('Error during child data fetch:', apiError);
      setError('An error occurred while saving child data.');
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
