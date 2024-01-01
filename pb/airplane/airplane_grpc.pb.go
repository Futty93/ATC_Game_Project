// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v4.25.1
// source: pb/airplane/airplane.proto

package airplane

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// AirplaneClient is the client API for Airplane service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AirplaneClient interface {
	Location(ctx context.Context, in *LocationRequest, opts ...grpc.CallOption) (*LocationReply, error)
}

type airplaneClient struct {
	cc grpc.ClientConnInterface
}

func NewAirplaneClient(cc grpc.ClientConnInterface) AirplaneClient {
	return &airplaneClient{cc}
}

func (c *airplaneClient) Location(ctx context.Context, in *LocationRequest, opts ...grpc.CallOption) (*LocationReply, error) {
	out := new(LocationReply)
	err := c.cc.Invoke(ctx, "/airplane/Location", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AirplaneServer is the server API for Airplane service.
// All implementations must embed UnimplementedAirplaneServer
// for forward compatibility
type AirplaneServer interface {
	Location(context.Context, *LocationRequest) (*LocationReply, error)
	mustEmbedUnimplementedAirplaneServer()
}

// UnimplementedAirplaneServer must be embedded to have forward compatible implementations.
type UnimplementedAirplaneServer struct {
}

func (UnimplementedAirplaneServer) Location(context.Context, *LocationRequest) (*LocationReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Location not implemented")
}
func (UnimplementedAirplaneServer) mustEmbedUnimplementedAirplaneServer() {}

// UnsafeAirplaneServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AirplaneServer will
// result in compilation errors.
type UnsafeAirplaneServer interface {
	mustEmbedUnimplementedAirplaneServer()
}

func RegisterAirplaneServer(s grpc.ServiceRegistrar, srv AirplaneServer) {
	s.RegisterService(&Airplane_ServiceDesc, srv)
}

func _Airplane_Location_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LocationRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AirplaneServer).Location(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/airplane/Location",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AirplaneServer).Location(ctx, req.(*LocationRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Airplane_ServiceDesc is the grpc.ServiceDesc for Airplane service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Airplane_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "airplane",
	HandlerType: (*AirplaneServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Location",
			Handler:    _Airplane_Location_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pb/airplane/airplane.proto",
}