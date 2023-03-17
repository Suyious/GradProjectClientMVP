import MCQSelect from "../../components/mcqselect"
import { TestCard } from "../../components/upcomingtestcard"
import { AddQuestions } from "../../components/addquestions"
import type { Question } from "../../types/question"
import type { MockTest } from "../../types/mocktest"
import { useState } from "react"

const Experimental = () => {

	const test:MockTest = {
		id: 1,
		name: "The Best Test Ever",
		description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum minus voluptatibus nobis porro iure incidunt, sed quo architecto magni? Modi quod non sint sapiente explicabo. Qui in tempore, impedit ea quos, ducimus fuga ad ipsam distinctio exercitationem doloribus fugiat quam? Fugit aspernatur dicta voluptatem possimus quibusdam saepe quas, mollitia corporis labore distinctio animi quaerat voluptatibus nihil perferendis laudantium laborum fuga aliquam at maxime delectus exercitationem sed minus. Cum nobis asperiores repellendus quibusdam accusantium voluptatum culpa minus earum dicta optio ad velit enim quod quam nostrum hic ratione, quas dolorum vel molestias ab pariatur ullam iusto nam! Necessitatibus ipsum libero mollitia obcaecati beatae nesciunt voluptatum dolores vitae sunt qui. Labore totam ducimus, sit rerum incidunt architecto laborum. Voluptatibus provident, harum cum veniam repudiandae mollitia laborum natus non odit consequuntur unde ratione alias minus et ipsa. Molestiae dicta eius dolorem dignissimos hic atque esse? Vero tenetur aut expedita perspiciatis dicta, nobis natus dolore? Id, sapiente commodi soluta aliquid explicabo suscipit. Aspernatur sunt, sequi itaque fuga reiciendis, praesentium quae atque saepe consectetur nisi similique sit accusamus, ullam eaque! Ducimus, suscipit! Enim consequuntur sequi praesentium, nesciunt ea cumque, ad iure dolores perspiciatis expedita repellat doloribus corporis adipisci eaque, placeat fuga possimus. Est impedit illum pariatur deserunt adipisci aliquam at ipsa doloremque. Asperiores tempora error similique facilis perspiciatis corrupti eveniet voluptate sit nesciunt aliquid alias iste laborum fuga officiis, aperiam delectus temporibus iure sequi hic tempore corporis voluptates consequatur quam culpa? Veritatis ab sit ratione eaque laborum doloribus cum dolore consequatur vitae! Beatae unde veritatis dicta, cum veniam voluptate illum consequuntur, obcaecati natus quae harum numquam odit laborum animi ipsam porro iusto voluptatem consectetur voluptatum nemo eligendi voluptates maxime eos. Earum, esse est ducimus error illo qui, nobis odio vitae molestias amet consequatur culpa delectus ut nulla placeat, officiis labore eos vel autem! Illo ea voluptatibus blanditiis atque et praesentium deleniti dolores, perspiciatis explicabo. Fuga eum facere dolores possimus voluptatem odio esse corrupti pariatur doloremque aspernatur. Minus officiis quaerat quod odit enim aliquam vero adipisci quas mollitia laboriosam, odio iste nihil placeat earum, omnis facilis temporibus reiciendis cumque est autem in? Ab fugit illo et quam cupiditate harum repellat hic impedit, velit voluptatibus, incidunt cumque itaque. Nostrum, inventore quam praesentium expedita, cum in quasi voluptatibus, error ad iste provident at? Excepturi temporibus voluptatibus beatae aspernatur veritatis reprehenderit. Natus dolorum doloribus ab rerum dolore pariatur odit ullam quaerat blanditiis, ad perspiciatis illo! Consequatur sint repudiandae est inventore error officiis obcaecati tenetur impedit deleniti ullam fugit veritatis modi, voluptate quis? Corrupti, eaque. Suscipit, molestias nemo dolore numquam quaerat id. Maiores dignissimos distinctio incidunt dolorem, iusto qui quod explicabo accusamus enim, labore facilis obcaecati eum repellat deserunt aperiam vero! Laborum minima omnis beatae quasi aut quidem corrupti, perspiciatis alias error quisquam quis possimus sint nesciunt quas eaque ut deserunt quibusdam facere? Quibusdam reprehenderit fugiat, et magni facilis, nesciunt eligendi fugit velit impedit necessitatibus ipsa iusto quasi nobis in, veritatis esse quos sint modi numquam optio asperiores nulla magnam cumque animi? Vitae aliquam totam eius ut nihil itaque officia.",
		author: "Jolly Good Man",
		created_at: new Date(new Date().getTime() - 2 * 60 * 60 * 60 * 1000),
		starts_at: new Date(new Date().getTime() + 3 * 60 * 60 * 60 * 1000),
		duration: '02:00:00'
	}
	const question:Question = {
		serial: 1,
		statement: "What is your name yo",
		option_1: "Joginder",
		option_2: "Perminder",
		option_3: "Surendar",
		option_4: "Purendar",
		answer: "Joginder",
	}
	const [answer, setAnswer] = useState<Number>(0)

	return (
		<div className="experimental width-wrap">
			<TestCard test = { test } />
			<MCQSelect question={question} answer={answer} setAnswer={setAnswer}/>
		</div>
	)
}

export default Experimental
