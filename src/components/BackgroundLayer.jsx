
const BackgroundLayer = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            {/* 
        Container for the blobs.
        We use varying animation delays to make the movement feel more organic/random.
        
        Light Mode:
          - Colors: Pastel blue, purple, pink/mint
          - Blend: mix-blend-multiply
          - Opacity: opacity-70
        
        Dark Mode:
          - Colors: Deep cyan, violet, blue
          - Blend: mix-blend-soft-light (creates a glowing effect on dark backgrounds)
          - Opacity: opacity-40 to opacity-50
      */}

            {/* Blob 1: Top-left-ish */}
            <div className="absolute top-0 -left-4 w-72 h-72 
        bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob
        dark:bg-violet-500 dark:mix-blend-screen dark:opacity-50"
            ></div>

            {/* Blob 2: Top-right-ish */}
            <div className="absolute top-0 -right-4 w-72 h-72 
        bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob
        dark:bg-cyan-500 dark:mix-blend-screen dark:opacity-50"
                style={{ animationDelay: '2s' }}
            ></div>

            {/* Blob 3: Bottom-left/center */}
            <div className="absolute -bottom-8 left-20 w-72 h-72 
        bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob
        dark:bg-blue-600 dark:mix-blend-screen dark:opacity-50"
                style={{ animationDelay: '4s' }}
            ></div>

            {/* Optional: Add a subtle texture or noise if desired later, but for now just the blobs */}
        </div>
    );
};

export default BackgroundLayer;
