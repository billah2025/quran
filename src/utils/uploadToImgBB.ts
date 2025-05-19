export async function uploadToImgBB(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
  
    const res = await fetch(`https://api.imgbb.com/1/upload?key=40e58544cb5b668e512765223d0f98eb`, {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
  
    if (!data.success) throw new Error('Image upload failed');
  
    return data.data.url; // Direct image URL
  }
  