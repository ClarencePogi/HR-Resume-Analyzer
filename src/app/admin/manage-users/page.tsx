import AppLayout from "@/layouts/AppLayout";
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BreadCrumb } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { get_users } from "./actions";

const breadcrumb: BreadCrumb[] = [
	{ title: 'Manage User', href: '/admin/manage-users' }
];

export default async function ManageUsers() {
	const users = await get_users();
	// console.log(users);

	return (
		<AppLayout breadcrumb={breadcrumb}>
			<div className="flex flex-col gap-2">
				<h1>Manage Users</h1>
				<div className="p-4">
					<Drawer direction="right">
						<DrawerTrigger asChild>
							<Button variant="outline">Add User</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Are you absolutely sure?</DrawerTitle>
								<DrawerDescription>This action cannot be undone.</DrawerDescription>
							</DrawerHeader>
							<div className="p-4">{/* Content here */}</div>
							<DrawerFooter>
								<Button>Submit</Button>
								<DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
				<div className="flex justify-center items-center p-4">
					<Card size="sm" className="w-full">
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Created At</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user, index) => (
									<TableRow key={index}>
										<TableCell className="font-medium">{ user.name }</TableCell>
										<TableCell>{ user.email }</TableCell>
										<TableCell>{ user.roles?.[0]?.name }</TableCell>
										<TableCell>{ user.created_at.toDateString() }</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon" className="size-8">
														<MoreHorizontalIcon />
														<span className="sr-only">Open menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Duplicate</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem variant="destructive">
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<p>Pagination</p>
						</CardFooter>
					</Card>
						
				</div>
			</div>
			
		</AppLayout>
	)
}