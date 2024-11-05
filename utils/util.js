import dayjs from "dayjs"
export const getWeek = () => {
	console.log("星期几");
	const weeks={
		0:"一",
		1:"二",
		2:"三",
		3:"四",
		4:"五",
		5:"六",
		6:"七"
	}
	return weeks[dayjs().format('d')]
}