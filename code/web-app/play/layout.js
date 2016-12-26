import PureLayoutWithSidebar from '../src/components/pure/layout/LayoutWithSidebar.vue'

const renderSidebar = () => `
  <layout-with-sidebar>
    <div slot="main" class="f3">
Non aut asperiores qui et ipsum. Excepturi tempora doloremque corporis cum quaerat. Aut non rerum est laborum dolor et ut quia. Magnam iste libero est possimus aut alias. Officiis maiores ipsa quod sint itaque blanditiis.
Ipsum ut ea praesentium eum. Quo et commodi ratione doloremque. Tenetur rem voluptas fugit et modi.
A non ab rem sed. Numquam ut soluta nisi numquam et eveniet minus vel. Explicabo aut a facere nostrum. Architecto animi numquam iste explicabo ducimus repudiandae et architecto. Quia quisquam sit harum veritatis. Ut cumque omnis officia nihil.
Quo ea quis dolor accusamus iste. Consequuntur quis quaerat rerum perspiciatis aut voluptatem. Labore odio quia quis vero nesciunt nam voluptas. Aut vero enim minus nobis deleniti dignissimos aliquam. Dolorem est omnis aperiam. Et laudantium ut quod in.
Molestiae laborum officiis facilis error atque voluptas ut. Culpa est molestias dignissimos. Repellat voluptatem tenetur et quia reprehenderit numquam odit expedita. Eos non rem sunt.

Non aut asperiores qui et ipsum. Excepturi tempora doloremque corporis cum quaerat. Aut non rerum est laborum dolor et ut quia. Magnam iste libero est possimus aut alias. Officiis maiores ipsa quod sint itaque blanditiis.
Ipsum ut ea praesentium eum. Quo et commodi ratione doloremque. Tenetur rem voluptas fugit et modi.
A non ab rem sed. Numquam ut soluta nisi numquam et eveniet minus vel. Explicabo aut a facere nostrum. Architecto animi numquam iste explicabo ducimus repudiandae et architecto. Quia quisquam sit harum veritatis. Ut cumque omnis officia nihil.
Quo ea quis dolor accusamus iste. Consequuntur quis quaerat rerum perspiciatis aut voluptatem. Labore odio quia quis vero nesciunt nam voluptas. Aut vero enim minus nobis deleniti dignissimos aliquam. Dolorem est omnis aperiam. Et laudantium ut quod in.
Molestiae laborum officiis facilis error atque voluptas ut. Culpa est molestias dignissimos. Repellat voluptatem tenetur et quia reprehenderit numquam odit expedita. Eos non rem sunt.

Non aut asperiores qui et ipsum. Excepturi tempora doloremque corporis cum quaerat. Aut non rerum est laborum dolor et ut quia. Magnam iste libero est possimus aut alias. Officiis maiores ipsa quod sint itaque blanditiis.
Ipsum ut ea praesentium eum. Quo et commodi ratione doloremque. Tenetur rem voluptas fugit et modi.
A non ab rem sed. Numquam ut soluta nisi numquam et eveniet minus vel. Explicabo aut a facere nostrum. Architecto animi numquam iste explicabo ducimus repudiandae et architecto. Quia quisquam sit harum veritatis. Ut cumque omnis officia nihil.
Quo ea quis dolor accusamus iste. Consequuntur quis quaerat rerum perspiciatis aut voluptatem. Labore odio quia quis vero nesciunt nam voluptas. Aut vero enim minus nobis deleniti dignissimos aliquam. Dolorem est omnis aperiam. Et laudantium ut quod in.
Molestiae laborum officiis facilis error atque voluptas ut. Culpa est molestias dignissimos. Repellat voluptatem tenetur et quia reprehenderit numquam odit expedita. Eos non rem sunt.
    </div>

    <div slot="sidebar" class="f3">
      Non aut asperiores qui et ipsum. Excepturi tempora doloremque corporis cum quaerat. Aut non rerum est laborum dolor et ut quia. Magnam iste libero est possimus aut alias. Officiis maiores ipsa quod sint itaque blanditiis.
Ipsum ut ea praesentium eum. Quo et commodi ratione doloremque. Tenetur rem voluptas fugit et modi.
    </div>
  </layout-with-sidebar>
`

export default (play, m, wrap) => {
  play(PureLayoutWithSidebar, m)
    .name('layout-with-sidebar')
    .add('default', renderSidebar())
}
