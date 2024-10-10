import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";
import {useGetUsers} from "@/lib/react-query/queriesAndMutations.ts";
import {useUserContext} from "@/context/AuthContext.tsx";

const AllUsers = () => {
    const { toast } = useToast();
    const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
    const { user } = useUserContext();
    const currentUserId = user.id; // 현재 사용자 ID를 가져옵니다.

    if (isErrorCreators) {
        toast({ title: "Something went wrong." });
        return null; // 에러 발생 시 null 반환
    }

    // 현재 사용자를 제외한 크리에이터 목록 생성
    const filteredCreators = creators?.documents.filter(creator => creator.$id !== currentUserId);

    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
                {isLoading && !creators ? (
                    <Loader />
                ) : (
                    <ul className="user-grid">
                        {filteredCreators?.map((creator) => (
                            <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
