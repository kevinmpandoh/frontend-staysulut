// components/ProfilePicture.tsx
interface ProfilePictureProps {
  src: string;
}

export const ProfilePicture = ({ src }: ProfilePictureProps) => {
  return (
    <img
      alt="Foto Profil"
      className="w-32 h-32 rounded-2xl object-cover mb-4"
      src={src}
    />
  );
};
