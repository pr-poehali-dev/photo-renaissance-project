import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  url: string;
  title: string;
  gradient: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: '/img/72304fed-b1ad-4e3e-a77a-cfc0e94e9777.jpg',
    title: 'Mountain Lake Sunrise',
    gradient: 'from-coral to-peach'
  },
  {
    id: 2,
    url: '/img/c0503b23-e071-497b-ab64-1c9add2a9ae0.jpg',
    title: 'Crystal Reflections',
    gradient: 'from-peach to-turquoise'
  },
  {
    id: 3,
    url: '/img/5ec844b7-54b8-4dcd-b9de-10d8d7d5e759.jpg',
    title: 'Sunset Silhouette',
    gradient: 'from-turquoise to-coral'
  },
  {
    id: 4,
    url: '/img/72304fed-b1ad-4e3e-a77a-cfc0e94e9777.jpg',
    title: 'Golden Hour',
    gradient: 'from-coral to-turquoise'
  },
  {
    id: 5,
    url: '/img/c0503b23-e071-497b-ab64-1c9add2a9ae0.jpg',
    title: 'Azure Waters',
    gradient: 'from-turquoise to-peach'
  },
  {
    id: 6,
    url: '/img/5ec844b7-54b8-4dcd-b9de-10d8d7d5e759.jpg',
    title: 'Purple Dreams',
    gradient: 'from-peach to-coral'
  }
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToNext = () => {
    if (selectedPhoto !== null) {
      const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[nextIndex].id);
    }
  };

  const goToPrevious = () => {
    if (selectedPhoto !== null) {
      const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[prevIndex].id);
    }
  };

  const selectedPhotoData = photos.find(p => p.id === selectedPhoto);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-coral via-peach to-turquoise bg-clip-text text-transparent mb-4">
            Photo Animation AI
          </h1>
          <p className="text-lg text-gray-600">Оживи свои фотографии с помощью магии градиентов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-3xl cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(photo.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
              
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{photo.title}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Icon name="Sparkles" size={16} />
                    <span>Нажмите для просмотра</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="Maximize2" size={20} className="text-navy" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto !== null && selectedPhotoData && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <Icon name="X" size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all duration-200 hover:scale-110"
          >
            <Icon name="ChevronLeft" size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all duration-200 hover:scale-110"
          >
            <Icon name="ChevronRight" size={32} />
          </button>

          <div
            className="relative max-w-6xl max-h-[90vh] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute -inset-4 bg-gradient-to-br ${selectedPhotoData.gradient} opacity-30 blur-3xl rounded-3xl`} />
            
            <img
              src={selectedPhotoData.url}
              alt={selectedPhotoData.title}
              className="relative rounded-2xl max-h-[85vh] w-auto shadow-2xl"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-2xl">
              <h2 className="text-white text-3xl font-bold mb-2">{selectedPhotoData.title}</h2>
              <div className="flex items-center gap-4 text-white/70">
                <span className="flex items-center gap-2">
                  <Icon name="Image" size={18} />
                  Фото {photos.findIndex(p => p.id === selectedPhoto) + 1} из {photos.length}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(photo.id);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  photo.id === selectedPhoto
                    ? 'w-12 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}