import { useState, ChangeEvent } from 'react';

const UploadImage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

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
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={uploadImage}>Upload Image</button>
            {imageUrl && (
                <div>
                    <p>Image URL: {imageUrl}</p>
                    <img src={imageUrl} alt="Uploaded" />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
