interface RadialChartProps {
    current: number;
    total: number;
}

const RadialChart = ({current, total}: RadialChartProps) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const progress = (current / total) * 100;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative h-8 w-8">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* Cercle de fond */}
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-gray-200 dark:text-neutral-700"
                    strokeWidth="2"
                />
                {/* Cercle de progression */}
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-primary"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>

            {/* Affichage du pourcentage */}
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <span className="text-center text-xs font-bold text-primary">
                        {current}/{total}
                    </span>
            </div>
        </div>
    );
};

export default RadialChart;