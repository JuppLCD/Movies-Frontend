export const insertListIdEndpoint = (urn: string, listId: string | number) => {
	return urn.replace(':listId', String(listId));
};
