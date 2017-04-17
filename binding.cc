#include <node.h>
#include <nan.h>
#include <fcntl.h>
#include <sys/param.h>
#include <sys/file.h>

using namespace node;
using namespace v8;

NAN_METHOD(flock) {
  int fd = info[0]->Uint32Value();
  int err = flock(fd, LOCK_EX | LOCK_NB);

  info.GetReturnValue().Set(Nan::New(err));
}

NAN_MODULE_INIT(InitAll) {
  Nan::Set(target, Nan::New("flock").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(flock)).ToLocalChecked());
}


NODE_MODULE(fs_open_locked, InitAll)

