import { Models } from "appwrite";
import {useGetRecentPosts, useGetUsers} from "@/lib/react-query/queriesAndMutations.ts";
import Loader from "@/components/shared/Loader.tsx";
import PostCard from "@/components/shared/PostCard.tsx";
import UserCard from "@/components/shared/UserCard.tsx";
import {useUserContext} from "@/context/AuthContext.tsx";

const Home = () => {
    const { user } = useUserContext();
    const currentUserId = user.id; // 현재 사용자 ID를 가져옵니다.
    const {
        data: posts,
        isLoading: isPostLoading,
        isError: isErrorPosts,
    } = useGetRecentPosts();
    const {
        data: creators,
        isLoading: isUserLoading,
        isError: isErrorCreators,
    } = useGetUsers(10);

    if (isErrorPosts || isErrorCreators) {
        return (
            <div className="flex flex-1">
                <div className="home-container">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
                <div className="home-creators">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
            </div>
        );
    }

    // 현재 사용자의 ID를 제외한 크리에이터 목록 생성
    const filteredCreators = creators?.documents.filter(creator => creator.$id !== currentUserId);

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {isPostLoading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full ">
                            {posts?.documents.map((post: Models.Document) => (
                                <li key={post.$id} className="flex justify-center w-full">
                                    <PostCard post={post} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="home-creators">
                <h3 className="h3-bold text-light-1">Top Creators</h3>
                {isUserLoading && !creators ? (
                    <Loader />
                ) : (
                    <ul className="grid 2xl:grid-cols-2 gap-6">
                        {filteredCreators?.map((creator) => (
                            <li key={creator.$id}>
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;