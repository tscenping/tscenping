

interface ImageResizingProps {
  file: File;
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

export function resizeImage({
  file,
  maxWidth,
  maxHeight,
  quality,
}: ImageResizingProps): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result as string; // event.target.result를 string으로 캐스팅
      const img = new Image();
      img.src = result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // 이미지 크기 조절
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // canvas에서 Blob으로 변환
        canvas.toBlob(
          (blob) => {
            // Blob을 File로 변환하여 resolve
            const resizedFile = new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          "image/jpeg",
          quality
        );
      };
    };
    reader.onerror = (error: ProgressEvent<FileReader>) => {
      reject(error);
    };
  });
}
