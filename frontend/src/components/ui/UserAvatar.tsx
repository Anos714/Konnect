interface UserAvatarProps {
  name?: string;
  className?: string;
  ring?: string;
}

const UserAvatar = ({ name, className = "h-12 w-12", ring = "" }: UserAvatarProps) => {
  const initial = name?.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-content ${ring} ${className}`}
      aria-label={`${name || "User"} avatar`}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;
