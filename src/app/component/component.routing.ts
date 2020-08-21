import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { NewsComponent } from './news/news.component';
import { FormComponent } from './form/form.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'users',
				component: UserComponent,
				data: {
					title: 'Usuarios',
				}
			},
			{
				path: 'products',
				component: ProductComponent,
				data: {
					title: 'Productos',
				}
			},
			{
				path: 'news',
				component: NewsComponent,
				data: {
					title: 'Noticias',
				}
			},
			{
				path: 'forms',
				component: FormComponent,
				data: {
					title: 'Encuestas',
				}
			}
		]
	}
];
