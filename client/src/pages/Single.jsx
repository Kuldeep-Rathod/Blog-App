import React from 'react'
import { Link } from 'react-router-dom'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../components/Menu'

const Single = () => {

    

    return (
        <div className="single">
            <div className="content">
                <img src="" alt="" />
                <div className="user">      
                    <img src="" alt="" />
                    <div className="info">
                        <span>John</span>
                        <p>posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=2`}>
                            <img src={Edit} alt="" />
                        </Link>
                        <img src={Delete} alt="" />
                    </div>
                </div>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae assumenda minima harum consequuntur facilis. Nesciunt voluptas facere ex repellat molestiae dignissimos porro quae odit? Perspiciatis, minima. Nostrum, dolorum delectus! Iste veniam perferendis optio hic magni cumque? Placeat alias facere, provident dolor optio commodi dolorum enim saepe ea odio laborum eligendi vero fuga dolore inventore voluptatem veritatis in consequuntur nisi! Blanditiis dolor doloribus, ab aut, vel expedita molestiae cumque ducimus eum officiis aliquid? Eum ut veniam, a molestias minus quaerat quasi accusamus distinctio vitae culpa fugit sequi expedita fugiat nesciunt facere provident repellendus quos inventore deleniti esse quam. Accusantium sed totam ut impedit, autem pariatur nostrum alias optio ad quisquam temporibus eius vero, excepturi beatae. Culpa suscipit accusamus similique reprehenderit incidunt ipsum alias atque magnam, pariatur ea explicabo officiis sequi dignissimos voluptas ad corrupti non enim est qui recusandae. Dolor, voluptate consectetur? Aliquid ut quasi, velit, quisquam autem praesentium maiores ducimus voluptatum dignissimos deleniti neque, quam temporibus incidunt doloribus reiciendis ullam nostrum culpa obcaecati distinctio eveniet numquam minima maxime voluptas. Qui repellat odio omnis harum quia aliquid rem alias beatae porro delectus, cumque nam quibusdam magnam, dicta a ex! Vitae possimus iusto magni magnam natus vel cum aspernatur minus odio dolorem.</p>
            </div>
            <Menu/>
        </div>
    )
}

export default Single
