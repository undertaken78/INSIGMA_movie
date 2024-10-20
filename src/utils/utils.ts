export const convertRuntime = (minutes: number) : string => {
	const hours: number = Math.floor(minutes / 60)
	const remMinutes: number = minutes % 60
	return `${hours}ч ${remMinutes}м`
}

export const truncateOverview = (str: string, num: number) : string => {
	if(str?.length > num) {
		return str.slice(0, num) + '...'
	}
	else return str
}

export const slideLeft = (sliderId: string) => {
	var slider: HTMLElement | null = document.getElementById(sliderId);
	slider?.scrollLeft !== undefined && (slider.scrollLeft -= 500);
};
export const slideRight = (sliderId: string) => {
	var slider = document.getElementById(sliderId);
	slider?.scrollLeft !== undefined && (slider.scrollLeft += 500);
};