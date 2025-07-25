type AvatarProps = {
        src?: string,
        alt?: string,
        size?: number,
        fallback?: string,
        className?: string
};

export const Avatar = ({ src, alt = '', size = 40, fallback, className = '' }: AvatarProps) => (
    src ?
        <img src={src} alt={alt} className={`rounded-full object-cover border border-gray-200 dark:border-gray-600 ${className}`} style={{ width: size, height: size }} />
        : <div className={`rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-bold border border-gray-200 dark:border-gray-600 ${className}`}
               style={{ width: size, height: size }}>
                {fallback || '?'}
        </div>
);
