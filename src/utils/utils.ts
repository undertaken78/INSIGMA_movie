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