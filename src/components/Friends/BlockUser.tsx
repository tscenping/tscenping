import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalState } from "../../store/modal";
import { useChatSetting } from "../../store/chat";

interface BlockUserProps {
  nickname: string;
  avatar: string;
  id: number;
  status: "ONLINE" | "OFFLINE" | "NONE";
}

const BlockUser = (props: BlockUserProps): JSX.Element => {
  const queryClient = useQueryClient();
  const { setModalName } = useModalState();
  const { setChatSetting } = useChatSetting();
  const instance = useAxios();

  const blockCancelApiHandler = async () => {
    try {
      const response = await instance.delete("/users/blocks", {
        data: {
          blockId: props.id,
        },
      });
      if (response.status === 200) setModalName(null);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationFn: blockCancelApiHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block-users"] });
    },
  });

  return (
    <li
      key={props.id}
      className="flex justify-between items-center w-full py-4"
    >
      <section className="flex items-center">
        <img
          src={props.avatar}
          className="w-10 rounded-full"
          alt="block user profile"
        />
        <strong className="ml-[16px] font-[Pretendard] text-base">
          {props.nickname}
        </strong>
      </section>
      <button
        className="bg-[#e2e2e2] text-black text-[12px] px-3 py-1 rounded-[30px] font-[Pretendard-SemiBold]"
        onClick={() => {
          setModalName("chatSetting");
          setChatSetting(
            "",
            `${props.nickname}님을 차단해제 하시겠습니까?`,
            "해제하기",
            mutate
          );
        }}
      >
        차단 해제
      </button>
    </li>
  );
};

export default BlockUser;
