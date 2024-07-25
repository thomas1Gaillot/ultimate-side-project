import { useState, ChangeEvent, useRef, useEffect } from 'react';

const useImageUpload = (onImageUpload: (url: string) => void) => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [image]);

    const uploadImage = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setImageUrl(data.url);
        onImageUpload(data.url); // Call the callback function with the image URL
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return { triggerFileInput, handleImageChange, imageUrl, fileInputRef };
};

export default useImageUpload;
