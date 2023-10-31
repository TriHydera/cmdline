function load() {
  action.echotools = {
    click: (text, run = () => { }) => {
      elem = $(`<span>${text}</span>`);
      elem.click(run);
      return elem.prop("outerHTML");
    }
  }
}