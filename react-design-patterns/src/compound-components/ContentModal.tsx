import Modal from "./Modal";

const fakeData = {
  title: "Are you sure you want to submit ?",
  content: "Your feedback will be sent to our mailbox",
};
export default function ContentModal() {
  return (
    <div className="h-[100vh] w-full grid grid-cols-2 gap-4">
      <Modal modal={fakeData}>
        <Modal.Title />
        <Modal.Content />
        <Modal.FooterButton />
      </Modal>

      <Modal modal={fakeData}>
        <Modal.Title subTitle="Hi Yen" />
        <Modal.Content />
      </Modal>
    </div>
  );
}
