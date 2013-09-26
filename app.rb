require 'sinatra'
require 'json'

get '/' do
  erb :index
end

get '/files' do
  all = Dir["files/**/*"]
  process_file_list(all).to_json
end

get '/test' do
  content_type :json
  glob_str = params[:glob] || "**/*"
  res = Dir["files/#{glob_str}"]
  process_file_list(res).to_json
end

def process_file_list(list)
  list.map do |item|
    if File.directory?(item)
      item = item + "/"
    end
    item.gsub!("files/", "")
    item
  end
end
