// ImagenConHeader.tsx
import { useEffect, useState } from "react";

interface Props {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync" | "auto";
    itemProp?: string;
}

export const ImagenConHeader = ({ 
    src, 
    alt, 
    className, 
    style,
    loading,
    decoding,
    itemProp 
}: Props) => {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cargarImagen = async () => {
            try {
                setIsLoading(true);
                setError(false);

                const response = await fetch(src, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (!response.ok) throw new Error('Error al cargar imagen');

                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                setImageSrc(objectURL);
            } catch (err) {
                console.error('Error cargando imagen:', err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (src) {
            cargarImagen();
        }

        // Cleanup: liberar el objeto URL cuando el componente se desmonte
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [src]);

    if (isLoading) {
        return (
            <div className={className} style={style}>
                <div className="d-flex justify-content-center align-items-center h-100 bg-light">
                    <span className="text-muted">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error || !imageSrc) {
        return (
            <div className={className} style={style}>
                <div className="d-flex justify-content-center align-items-center h-100 bg-secondary text-white">
                    Error al cargar
                </div>
            </div>
        );
    }

    return (
        <img 
            src={imageSrc} 
            alt={alt} 
            className={className} 
            style={style}
            loading={loading}
            decoding={decoding}
            itemProp={itemProp}
        />
    );
};